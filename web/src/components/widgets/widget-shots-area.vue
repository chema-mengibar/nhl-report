<script>
import RinkAreas from "../content/rink-areas.vue";
import * as d3 from "d3";
import { toRaw } from "vue";

export default {
  inject: ["$services"],
  name: "WidgetShotsArea",
  props: {
    id: { type: String, default: null },
    teamKey: { type: String, default: null, required: false },
    groupKey: { type: String, default: null },
  },
  data: () => ({
    t: {},
    loading: true,
    dataSet: null,
    maxShots: 1,
    gameIdx: 0,
    numGames: [],
    useGrey: false,
    h: 100,
    areas: {
      team_a: null,
      team_b: null,
    },
    values: {
      team_a: null,
      team_b: null,
    },
  }),
  created() {
    this.t = this.$services.localeService.D();
  },
  methods: {
    onChange(event) {
      this.render();
    },
    setMaxShots: function () {
      let _maxShots = this.maxShots;

      const reportObj = this.dataSet.games_reports[this.gameIdx];
      // Home shots max
      let objShots = reportObj.report.shots.home;
      Object.keys(objShots).forEach((shotZoneKey) => {
        _maxShots = Math.max(objShots[shotZoneKey], _maxShots);
      });

      // Away shots max
      objShots = reportObj.report.shots.away;
      Object.keys(objShots).forEach((shotZoneKey) => {
        _maxShots = Math.max(objShots[shotZoneKey], _maxShots);
      });
      this.maxShots = _maxShots;
    },
    setDataByTeamKey: function (teamKey) {
      const teamName = this.dataSet[teamKey];

      const reportObj = this.dataSet.games_reports[this.gameIdx];

      const teamSideKey = reportObj.report.teams.home.includes(teamName)
        ? "home"
        : "away";
      const objShots = reportObj.report.shots[teamSideKey];

      const teamColor = this.useGrey
        ? "#ffffff"
        : this.$services.toolService.getTeamColor(teamName);
      const darkerColor = this.useGrey
        ? "#040404"
        : d3.rgb(teamColor).darker(7).formatHex();

      const colors = d3
        .scaleLinear()
        .domain([1, this.maxShots])
        .range([darkerColor, teamColor]);

      const _areasData = this.$services.toolService.rinkDefaultArea();
      const _values = this.$services.toolService.rinkDefaultArea();

      Object.keys(objShots).forEach((shotZoneKey) => {
        _areasData[shotZoneKey] = colors(objShots[shotZoneKey]);
        _values[shotZoneKey] = objShots[shotZoneKey];
      });

      this.areas[teamKey] = _areasData;
      this.values[teamKey] = _values;
    },
    init: function () {
      this.svg = d3.select(`#${this.id}-svg`);
    },
    render: function () {
      const container = document.getElementById(this.id);
      if (container) {
        const numCols = this.teamKey ? 1 : 2;
        this.h = document.getElementById(this.id).offsetWidth / numCols;
      }
      this.setMaxShots();
      if(this.teamKey){
        this.setDataByTeamKey(this.teamKey);
      }else{
        this.setDataByTeamKey("team_a");
        this.setDataByTeamKey("team_b");
      }
      
    },
    build: function () {
      try {
        if (!this.groupKey) {
          return;
        }
        this.loading = true;
        this.$services.toolService
          .getDataSet(this.groupKey, "widget-shots-area")
          .then((resp) => {
            this.dataSet = resp;
            this.loading = false;
            setTimeout(() => {
              this.init();
              this.$services.toolService
                .getSerieNumGames(this.groupKey, true)
                .then((resp) => {
                  this.numGames = resp;
                  this.render();
                });
            }, 500);
          });
      } catch (e) {
        console.error("[widget-shots-area] getDataSet", e);
        this.loading = false;
      }
    },
  },
  components: {
    RinkAreas,
  },
  mounted() {
    // console.log("[widget-shots-area] groupKey:", this.groupKey);
    this.build();
    window.addEventListener(
      "resize",
      this.$services.toolService.debounce(this.render)
    );
  },
  watch: {
    groupKey: function (newVal, oldVal) {
      if (newVal) {
        this.build();
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/media";

.widget-shots-area {

  .wrapper-select {
    margin-bottom: 7px;
    width: 250px;
    display: flex;
    gap: 15px;
    flex-direction: column;
    justify-content: flex-end;

    @include desktop {
      flex-direction: row;
    }
  }
  .wrapper-rinks {
    display: flex;
  }

  .checkbox-wrapper{
    display:flex;
  justify-content: flex-end;
  }

  .team-name {
    margin: 0 20px 7px;
    padding-bottom: 7px;
    text-align:center;
  }

  .team-border {
    border-bottom-width: 3px;
    border-bottom-style: solid;
  }
}
</style>

<template>
  <div :id="id" class="widget widget-shots-area" :data-cy="$options.name">
    <template v-if="!dataSet && !loading"> NO data</template>
    <template v-if="!dataSet && loading"> loading</template>
    <template v-if="dataSet && !loading">
      <div class="cell-header">
        <span>SHOTS by AREA & GAME</span>

        <div class="wrapper-select">
          
          <select class="dropdown" v-model="gameIdx" @change="onChange($event)">
            <option value="" disabled selected>-- Select a game --</option>
            <option
              v-for="gameNum in numGames"
              :key="id + '_game_' + (gameNum - 1)"
              :value="gameNum - 1"
            >
               {{ gameNum }} Game
            </option>
          </select>
          <div class="checkbox-wrapper">
            <label for="checkbox">B&W:</label>
            <input type="checkbox" id="checkbox" v-model="useGrey" @change="onChange($event)"/>
          </div>
        </div>
      </div>

      <div class="wrapper-rinks">
        <div v-if="areas.team_a">
          <div
            class="team-name"
            :class="{ 'team-border': true, [dataSet.team_a]: true }"
          >
            {{ dataSet.team_a }}
          </div>
          <RinkAreas
            :values="values.team_a"
            :w="h"
            
            :id="`${id}-team_a-svg`"
            :areas="areas.team_a"
          />
        </div>
        <div v-if="areas.team_b">
          <div
            class="team-name"
            :class="{ 'team-border': true, [dataSet.team_b]: true }"
          >
            {{ dataSet.team_b }}
          </div>
          <RinkAreas
            :values="values.team_b"
            :w="h"
            
            :id="`${id}-team_b-svg`"
            :areas="areas.team_b"
          />
        </div>
      </div>
    </template>
  </div>
</template>