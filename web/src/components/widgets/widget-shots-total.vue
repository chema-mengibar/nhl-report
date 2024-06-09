<script>
// import IconBase from "../icons/icon-base.vue";

import * as d3 from "d3";
import { toRaw } from "vue";

export default {
  inject: ["$services"],
  name: "WidgetShotsTotal",
  props: {
    id: { type: String, default: null },
    groupKey: { type: String, default: null },
  },
  data: () => ({
    t: {},
    loading: true,
    dataSet: null,
    svg: null,
    attr: {
      width: 0,
      height: 0,
      viewBox: '', //"0 0 0 0",
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
    },
  }),
  created() {
    this.t = this.$services.localeService.D();
  },
  methods: {
    init: function () {
      this.svg = d3.select(`#${this.id}-svg`);
    },
    render: function () {
      this.svg.selectAll("*").remove();

      const divWidth = document.getElementById(this.id).offsetWidth;
      const divHeight = document.getElementById(this.id).offsetHeight;

      this.attr.width = divWidth;
      this.attr.height = divHeight;
      this.attr.viewBox = `0 0 ${divWidth} ${divHeight}`;

      const numGames = this.dataSet.games_reports.length;

      const spacingW = Math.max(100, divWidth / numGames);

      this.attr.width = spacingW * numGames;

      const radiusW = spacingW / 2;
      const radiusH = divHeight / 3 / 2;

      const _a = this.dataSet.team_a;
      const _b = this.dataSet.team_b;

      const radius = Math.min(radiusH, radiusW);

      const arc = d3
        .arc()
        .innerRadius(radius * 0.7)
        .outerRadius(radius);

      const pie = d3
        .pie()
        //.padAngle(1 / radius)
        .sort(null)
        .value((d) => d.value);

      const topY = 50;

      // "LABELS: Game, score"
      this.dataSet.games_reports.forEach((games_report, idx) => {
        const h = idx % 2 == 0 ? 0 : topY + 10 + radius * 4 ;

        const delta = {
          x: idx * spacingW,
          y: h,
        };
        const g = this.svg
          .append("text")
          .attr("text-anchor", "start")
          .attr("x", delta.x)
          .attr("y", delta.y)
          .attr("dy", "2em")
           .attr( 'class', "svg-label")
          .text(
            "Game " +
              games_report.schedule_data.game +
              " ( " +
              games_report.report.score.home +
              "-" +
              games_report.report.score.away +
              " )"
          );
      });

      this.dataSet.games_reports.forEach((gameReport, idx) => {

          // Winner
          const teamSideWin =
            gameReport.report.score.home > gameReport.report.score.away
              ? "home"
              : "away";
          const teamNameWin = gameReport.report.teams[teamSideWin];

        ["home", "away"].forEach((teamKey, tIdx) => {


          // Coords
          const delta = {
            x: idx * spacingW + radius,
            y: topY + tIdx * (radius * 2 + 10) + radius,
          };

          const teamName = gameReport.report.teams[teamKey];
          let teamParsedName = "";
          if (teamName.includes(_a)) {
            teamParsedName = _a;
          } else {
            teamParsedName = _b;
          }


          const dataObj = gameReport.report.shots[teamKey]
          const _filledData100 = {
            max: 100 - (dataObj.shotsaved +  dataObj.shotmissed),
            ...dataObj
          }


          const _data = Object.entries(_filledData100).map(
            (entryItem) => {
              return {
                name: entryItem[0],
                value: entryItem[1],
              };
            }
          );

          const colorScale = d3
            .scaleOrdinal()
            .domain(["shotsaved", "shotmissed", 'max'])
            .range([
              `var(--color-${teamParsedName})`,
              `var(--color-shotmissed)`,
              `rgba(var(--grey-3), .15)`,
            ]);

          const g = this.svg.append("g").selectAll().data(pie(_data));
  

          if(teamName === teamNameWin){
            //var sym = d3.symbol().type(d3.symbolStar).size(30); 
            // g.enter()
            // .append("path") 
            // .attr("d", sym) 
            // .attr("fill", "white") 
            // .attr("transform", `translate(${delta.x}, ${delta.y - 17})`); 

             g.enter().append("text")
              .attr("text-anchor", "middle")
              .attr("x", delta.x)
              .attr("y", delta.y - 12)
              .attr("dy", "0")
              .attr( 'class', "svg-label small")
              .text('- WIN -');
          }

          g.enter()
            .filter((d)=> {
              return d.data.name !== 'max'
            })
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", (d) => {
              const desp = d.data.name === "shotmissed" ? -22 : 0;
              return delta.x + desp + 15;
            })
            .attr("y", delta.y + 5)
            .attr("dy", "0")
            .attr( 'class', "svg-label")
            .text((d) => {
              const char = d.data.name === "shotmissed" ? " / " : "";
              return d.value + char;
            });

          g.join("path")
            .attr("data-value", (d) => d.data.value)
            .attr("data-type", (d) => d.data.name)
            .attr("fill", (d) => colorScale(d.data.name))
            .attr("d", arc)
            .attr("transform", "translate(" + delta.x + "," + delta.y + ")");
        });
      });
    },
    build: function () {
      try {
        if (!this.groupKey) {
          return;
        }
        this.loading = true;
        this.$services.toolService
          .getDataSet(this.groupKey, "widget-shots-total")
          .then((resp) => {
            this.dataSet = resp;
            this.loading = false;

            setTimeout(() => {
              this.init();
              this.render();
            }, 500);
          });
      } catch (e) {
        console.error("[widget-shots-counter] getDataSet", e);
        this.loading = false;
      }
    },
  },
  components: {
    // IconBase,
  },
  mounted() {
    // console.log("[widget-shots-counter] groupKey:", this.groupKey);
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

.widget-shots-total {
  @include desktop {
    //
  }
}
</style>

<template>
  <div :id="id" class="widget scrollable widget-shots-total" :data-cy="$options.name">
    <template v-if="!dataSet && !loading"> NO data</template>
    <template v-if="!dataSet && loading"> loading</template>
    <template v-if="dataSet && !loading">
      <svg
        :id="`${id}-svg`"
        :width="attr.width"
        :height="attr.height"
 
      ></svg>
    </template>
  </div>
</template>