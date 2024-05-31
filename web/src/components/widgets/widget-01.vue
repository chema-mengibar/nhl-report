<script>
import * as d3 from "d3";
// import IconBase from '../icons/icon-base.vue'

export default {
  inject: ["$services"],
  name: "Widget01",
  props: {
    id: {type: String, default: null},
    reportId: {type: String, default: null},
    gameIdx: {type: Number, default: 0},
  },
  data: () => ({
    t: {},
    dataset: null,
    svg: null,
    attr: {
      width: 0,
      height: 0,
      viewBox: "0 0 0 0",
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
      const _ = this;
      this.svg = d3.select(`#${this.id}-svg`);
    },
    render: function () {

      const reportId = this.reportId;
      const gameIdx = this.gameIdx;


      this.svg.selectAll("*").remove();

      const divWidth = document.getElementById(this.id).offsetWidth;
      const divHeight = document.getElementById(this.id).offsetHeight;

      this.attr.width = divWidth;
      this.attr.height = divHeight;
      this.attr.viewBox = `0 0 ${divWidth} ${divHeight}`;


      const _data = this.$services.toolService.getData(reportId);

      this.dataset = _data.games_reports[gameIdx]

      const svgData = {
        home: [],
        away: [],
      };

      let maxX = 3600; // seconds in game -> 20*3 * 60
      let maxY = 100;

      const margin = 10;

      const {report, schedule_data} = this.dataset;


      const colorHome = `var(--color-${report.teams.home.name.replace(' ', '-')})`;
      const colorAway = `var(--color-${report.teams.away.name.replace(' ', '-')})`;


      report.shoots.home.forEach(shootItem => {

        let color = null;
        if (shootItem.shoot_type === "shotmissed") {
          color = 'var(--color-shotmissed)'
        }
        if (shootItem.shoot_type === "goal") {
          color = 'var(--color-goal)'
        }
        svgData.home.push([shootItem.time_game_seconds, shootItem.shoot_counter_onclock, color])
        // maxX = Math.max(maxX, shootItem.time_game_seconds)
        // maxY = Math.max(maxY, shootItem.shoot_counter_onclock)
      })


      report.shoots.away.forEach(shootItem => {
        let color = null;
        if (shootItem.shoot_type === "shotmissed") {
          color = 'var(--color-shotmissed)'
        }
        if (shootItem.shoot_type === "goal") {
          color = 'var(--color-goal)'
        }
        svgData.away.push([shootItem.time_game_seconds, shootItem.shoot_counter_onclock, color])
        // maxX = Math.max(maxX, shootItem.time_game_seconds)
        // maxY = Math.max(maxY, shootItem.shoot_counter_onclock)
      })

      


      const xScale = d3
          .scaleLinear()
          .domain([0, maxX])
          .range([margin, this.attr.width - margin]);

      const yScale = d3
          .scaleLinear()
          .domain([0, maxY])
          .range([this.attr.height - margin, margin]);

      this.svg.append("g").style('color', 'var(--grey-3)').call(d3.axisBottom(xScale));
      this.svg.append("g").style('color', 'var(--grey-3)').call(d3.axisRight(yScale));


      var line = d3.line()
          .x((d) => xScale(d[0]))
          .y((d) => yScale(d[1]))
          .curve(d3.curveMonotoneX);

      
      // Period Line
       this.svg
          .append("line")
          .attr('x1', xScale(1200))
          .attr('y1', yScale(0))
          .attr('x2', xScale(1200))
          .attr('y2', yScale(120))
          .style("fill", "none")
          .style("stroke-opacity", ".5")
          .style("stroke", 'var(--grey-2)')
          .style("stroke-width", 2);

      this.svg
          .append("line")
          .attr('x1', xScale(2400))
          .attr('y1', yScale(0))
          .attr('x2', xScale(2400))
          .attr('y2', yScale(120))
          .style("fill", "none")
          .style("stroke-opacity", ".5")
          .style("stroke", 'var(--grey-2)')
          .style("stroke-width", 2);
      


      this.svg
          .append("path")
          .datum(svgData.home)
          .attr("class", "line")
          .attr("d", line)
          .style("fill", "none")
                    .style("stroke", colorHome)
          .style("stroke-width", 1);

      this.svg
          .append("g")
          .selectAll("dot")
          .data(svgData.home)
          .enter()
          .append("circle")
          .attr("cx", (d) => xScale(d[0]))
          .attr("cy", (d) => yScale(d[1]))
          .attr("r", 3)
          .style("fill-opacity", "1")
          .style("fill", (d) => d[2] || colorHome);




      this.svg
          .append("path")
          .datum(svgData.away)
          .attr("class", "line")
          .attr("d", line)
          .style("fill", "none")
          .style("stroke", colorAway)
          .style("stroke-width", 1);

      this.svg
          .append("g")
          .selectAll("dot")
          .data(svgData.away)
          .enter()
          .append("circle")
          .attr("cx", (d) => xScale(d[0]))
          .attr("cy", (d) => yScale(d[1]))
          .attr("r", 3)
          .style("fill-opacity", "1")
          .style("fill", (d) => d[2] || colorAway);

    },
  },
  mounted() {
    this.init();
    this.render();

    window.addEventListener(
        "resize",
        this.$services.toolService.debounce(this.render)
    );
  },
  components: {
    // IconBase,
  },
};
</script>

<style lang="scss">
@import "../../styles/media";

.widget {
  @include desktop {
    //
  }
}
</style>

<template>
  <div :id="id" class="widget" :data-cy="$options.name">

<!--    <div v-if="dataset">Game {{ dataset.schedule_data.game }} ({{ dataset.schedule_data.score }})</div>-->
    <svg
        :id="`${id}-svg`"
        :width="attr.width"
        :height="attr.height"
        :viewBox="attr.viewBox"
    ></svg>
  </div>
</template>