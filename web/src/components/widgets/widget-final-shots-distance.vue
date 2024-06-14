<script>
import Rink from "../content/rink.vue";
import * as d3 from "d3";
import {toRaw} from "vue";

export default {
  inject: ["$services"],
  name: "WidgetFinalShotsDistance",
  props: {
    id: {type: String, default: null},
    teamKey: {type: String, default: "team_a", required: true},
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
    w: 100,
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
      const _id = `#${this.id}-svg .canvas`;
      const canvas = d3.select(_id);
      canvas.selectAll("*").remove();

      this.show[teamKey] = true;

      const teamName = this.dataSet[teamKey];

      this.dataSet.games.forEach(reportObj => {
        const teamSideKey = reportObj.report.teams.home.name.includes(teamName)
            ? "home"
            : "away";

        const teamColor = this.useGrey
            ? "#ffffff"
            : this.$services.toolService.getTeamColor(teamName);
        
        
        const shotColors = {
          emptynetgoal: 'var(--color-goal)',
          shotmissed: 'var(--color-shotmissed)',
          goal: 'var(--color-goal)',
          shotsaved: teamColor,
        }

        reportObj.report.shots[teamSideKey].forEach((shotItem) => {
          const _x = this.transpolateX(shotItem.location.coord_x);
          const _y = this.transpolateY(shotItem.location.coord_y);
         
          canvas
              .append("circle")
              .attr("cx", _x)
              .attr("cy", _y)
              .attr("r", "3px")
              .style("fill",           shotColors[shotItem.shot_type])
              .style("fill-opacity", "1");
        });
      })
    },
    transpolateX: function (dataX) {
      let _x = 0;

      if (dataX > 1200) {
        _x = (dataX - 1200) / (this.dim.rink.x / this.dim.svg.x);
      } else {
        _x = dataX / (this.dim.rink.x / this.dim.svg.x);
      }

      // console.log("x----------", dataX, _x);
      return _x;
    },
    transpolateY: function (dataY) {
      const _y = this.dim.svg.y - (dataY / (this.dim.rink.y / this.dim.svg.y));
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
        this.w = (document.getElementById(this.id).offsetWidth ) ;
        this.h = (document.getElementById(this.id).offsetHeight * 0.8) ;
      }

      this.setDataByTeamKey(this.teamKey);
    },
    build: function () {
      try {

        this.loading = true;
        this.$services.toolService
            .getDataSet('Oilers-Panthers', "widget-final-shots-counter")
            .then((resp) => {
              this.dataSet = resp;
              this.loading = false;
              setTimeout(() => {
                this.init();
                this.render();
              }, 500);
            });
      } catch (e) {
        console.error("[widget-final-shots-distance] getDataSet", e);
        this.loading = false;
      }
    },
  },
  components: {
    Rink,
  },
  mounted() {
    // console.log("[widget-final-shots-distance] groupKey:", this.groupKey);
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
    margin: 0 20px 7px;
    padding-bottom: 7px;
    text-align: center;
    min-width: 50%;
  }

  .team-border {
    border-bottom-width: 3px;
    border-bottom-style: solid;
  }
}
</style>

<template>
  <div :id="id" class="widget widget-shots-distance" :data-cy="$options.name">
    <template v-if="!dataSet && !loading"> NO data</template>
    <template v-if="!dataSet && loading"> loading</template>
    <template v-if="dataSet && !loading">
      <div class="cell-header">
        <span>SHOTS in FINAL GAMES</span>

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

        </div>
      </div>


        <div class="cell-body" v-show="show">
          <div
              class="team-name"
              :class="{ 'team-border': true, [dataSet[teamKey]]: true }"
          >
            {{ dataSet[teamKey] }}
          </div>
          <Rink :w="w" :h="h" :id="`${id}-svg`"/>
        </div>

    </template>
  </div>
</template>