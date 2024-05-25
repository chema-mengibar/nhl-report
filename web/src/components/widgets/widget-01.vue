<script>
import * as d3 from "d3";
// import IconBase from '../icons/icon-base.vue'

export default {
  inject: ["$services"],
  name: "Widget01",
  props: {
    id: { type: String, default: null },
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
      this.svg.selectAll("*").remove();

      const divWidth = document.getElementById(this.id).offsetWidth;
      const divHeight = document.getElementById(this.id).offsetHeight;

      this.attr.width = divWidth;
      this.attr.height = divHeight;
      this.attr.viewBox = `0 0 ${divWidth} ${divHeight}`;

      this.dataset = this.$services.toolService.getData();

      const svgData = {
        home:[],
        away:[],
      };

      let maxX = 0;
      let maxY = 0;



      this.dataset.shoots.home.forEach( shootItem =>{
        svgData.home.push([ shootItem.time_game_seconds, shootItem.shoot_counter_onclock ])
        maxX = Math.max(maxX, shootItem.time_game_seconds)
        maxY = Math.max(maxY, shootItem.shoot_counter_onclock)
      })


      this.dataset.shoots.away.forEach( shootItem =>{
        svgData.away.push([ shootItem.time_game_seconds, shootItem.shoot_counter_onclock ])
        maxX = Math.max(maxX, shootItem.time_game_seconds)
        maxY = Math.max(maxY, shootItem.shoot_counter_onclock)
      })

      const margin = 10;


      const xScale = d3
        .scaleLinear()
        .domain([0, maxX])
        .range([margin, this.attr.width - margin]);

      const yScale = d3
        .scaleLinear()
        .domain([0, maxY])
        .range([this.attr.height - margin, margin]);

      this.svg.append("g").style('color', 'var(--grey-3)').call(d3.axisBottom(xScale));
      this.svg.append("g").style('color',  'var(--grey-3)').call(d3.axisRight(yScale));



      var line = d3.line()
        .x( (d)=> xScale(d[0]))
        .y( (d)=>  yScale(d[1]))
        .curve(d3.curveMonotoneX);

      this.svg
        .append("g")
        .selectAll("dot")
        .data(svgData.home)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d[0]))
        .attr("cy", (d) => yScale(d[1]))
        .attr("r", 2)
        .style("fill", "var(--color-1_rgb)");

      this.svg
        .append("path")
        .datum(svgData.home)
        .attr("class", "line")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "var(--color-1_rgb)")
        .style("stroke-width", "4");



              this.svg
        .append("g")
        .selectAll("dot")
        .data(svgData.away)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d[0]))
        .attr("cy", (d) => yScale(d[1]))
        .attr("r", 2)
        .style("fill", "var(--color-2_rgb)");
        
      this.svg
        .append("path")
        .datum(svgData.away)
        .attr("class", "line")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "var(--color-2_rgb)")
        .style("stroke-width", "4");
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
    <svg
      :id="`${id}-svg`"
      :width="attr.width"
      :height="attr.height"
      :viewBox="attr.viewBox"
    ></svg>
  </div>
</template>