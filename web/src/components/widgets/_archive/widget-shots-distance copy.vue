<script>
import Rink from "../content/rink.vue";
import * as d3 from "d3";
import { toRaw } from "vue";

export default {
  inject: ["$services"],
  name: "WidgetShotsDistance",
  props: {
    id: { type: String, default: null },
    teamKey: { type: String, default: "team_a", required: true },
    groupKey: { type: String, default: null },
  },
  data: () => ({
    t: {},
    loading: true,
    dataSet: null,
    dim: {
      rink: {
        x: 2400,
        y: 1020,
      },
      svg: {
        x: 263,
        y: 259,
      },
    },
    gameIdx: 0,
    numGames: [],
    useGrey: false,
    h: 100,
    show: {
      team_a: false,
      team_b: false,
    },
  }),
  created() {
    this.t = this.$services.localeService.D();
  },
  methods: {
    onChange(event) {
      this.render();
    },

    setDataByTeamKey: function (teamKey) {


      const _id = `#${this.id}-${teamKey}-svg .canvas`;
      const canvas = d3.select(_id);
      canvas.selectAll("*").remove();


      this.show[teamKey] = true;

      const teamName = this.dataSet[teamKey];

      const reportObj = this.dataSet.games_reports[this.gameIdx];

      const teamSideKey = reportObj.report.teams.home.includes(teamName)
        ? "home"
        : "away";

      const teamColor = this.useGrey
        ? "#ffffff"
        : this.$services.toolService.getTeamColor(teamName);

      
      reportObj.report.shots[teamSideKey].forEach((shotItem) => {
        const _x = this.transpolateX(shotItem.location.coord_x);
        const _y = this.transpolateY(shotItem.location.coord_y);

        canvas
          .append("circle")
          .attr("cx", _x)
          .attr("cy", _y)
          .attr("r", "5px")
          .style("fill", teamColor)
          .style("fill-opacity", '0.8');
      });
    },
    transpolateX: function (dataX) {

       let _x = 0;

      if(dataX > 1200 ){
        _x = (dataX- 1200) / ((this.dim.rink.x  ) / this.dim.svg.x) 
      }else{
        _x = dataX / (this.dim.rink.x / this.dim.svg.x) 
      }
      
      console.log('x----------', dataX, _x)
      return _x;
    },
    transpolateY: function (dataY) {
      const _y = dataY / (this.dim.rink.y / this.dim.svg.y)  
      //console.log('y----------',dataY, _y)
      return _y;
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

      if (this.teamKey) {
        this.setDataByTeamKey(this.teamKey);
      } else {
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
          .getDataSet(this.groupKey, "widget-shots-distance")
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
        console.error("[widget-shots-distance] getDataSet", e);
        this.loading = false;
      }
    },
  },
  components: {
    Rink,
  },
  mounted() {
    // console.log("[widget-shots-distance] groupKey:", this.groupKey);
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

.widget-shots-distance {
  .wrapper-select {
    margin-bottom: 7px;
    width: 150px;
    display: flex;
    gap: 15px;
    flex-direction: column;
    justify-content: flex-end;
  }
  .wrapper-rinks {
    display: flex;
  }

  .checkbox-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  .team-name {
    margin-bottom: 7px;
    padding-left: 7px;
    margin-left: 7px;
  }

  .team-border {
    border-left-width: 15px;
    border-left-style: solid;
  }
}
</style>

<template>
  <div :id="id" class="widget widget-shots-distance" :data-cy="$options.name">
    <template v-if="!dataSet && !loading"> NO data</template>
    <template v-if="!dataSet && loading"> loading</template>
    <template v-if="dataSet && !loading">
      <div class="cell-header">
        <span>SHOTS by AREA & GAME</span>

        <div class="wrapper-select">
          <div class="checkbox-wrapper">
            <label for="checkbox">B&W:</label>
            <input
              type="checkbox"
              id="checkbox"
              v-model="useGrey"
              @change="onChange($event)"
            />
          </div>
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
        </div>
      </div>

      <div class="wrapper-rinks">
        <div v-show="show.team_a">
          <div
            class="team-name"
            :class="{ 'team-border': true, [dataSet.team_a]: true }"
          >
            {{ dataSet.team_a }}
          </div>
          <Rink :w="h" :id="`${id}-team_a-svg`" />
        </div>
        <div v-show="show.team_b">
          <div
            class="team-name"
            :class="{ 'team-border': true, [dataSet.team_b]: true }"
          >
            {{ dataSet.team_b }}
          </div>
          <Rink :w="h" :id="`${id}-team_b-svg`" />
        </div>
      </div>
    </template>
  </div>
</template>