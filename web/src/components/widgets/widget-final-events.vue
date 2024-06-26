<script>
import * as d3 from "d3";
import { toRaw } from "vue";

export default {
  inject: ["$services"],
  name: "WidgetFinalEvents",
  props: {
    id: { type: String, default: null },
    teamName: { type: String, default: "Panthers" },
    propName: { type: String, default: "", required: true },

  },
  data: () => ({
    t: {},
    loading: true,
    dataSet: null,
    svg: null,
    attr: {
      width: 0,
      height: 0,
      viewBox: "", //"0 0 0 0",
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

      const bottomSpacing = 10;

      const divWidth = document.getElementById(this.id).offsetWidth;
      const divHeight = document.getElementById(this.id).offsetHeight;

      this.attr.width = divWidth;
      this.attr.height = divHeight;
      this.attr.viewBox = `0 0 ${divWidth} ${divHeight}`;

      const playersData = this.dataSet[this.teamName];

      const dataObj = {};

      Object.keys(playersData).forEach((playername) => {
        if (!(playername in dataObj)) {
          dataObj[playername] = {
            player: playername,
          };
        }
        playersData[playername].forEach((playerEventItem) => {
          const eventType = playerEventItem.type;
          if (!(eventType in dataObj[playername])) {
            dataObj[playername][eventType] = 1;
          } else {
            dataObj[playername][eventType] += 1;
          }
        });
      });



      const list = Object.entries(dataObj).map((entryItem) => entryItem[1]);

      let maxHits = this.$services.toolService.getLimitByProp(this.propName);

      const objHits = list.map((listItem) => {
        return {
          value: listItem[this.propName],
          prop: `${listItem.player} (${listItem[this.propName]})`,
        };
      });

      const sortedObjHits = objHits
        .filter((i) => i.value)
        .sort((a, b) => d3.descending(a.value, b.value))
      
      sortedObjHits.splice(5);

      console.log(sortedObjHits)

      var x = d3.scaleLinear().domain([0, maxHits]).range([0, divWidth]);

      var y = d3
        .scaleBand()
        .range([0, divHeight - bottomSpacing])
        .domain(sortedObjHits.map((o) => o.prop))
        .padding(0.2);

      const color = this.$services.toolService.getTeamColor(this.teamName);

      this.svg
        .selectAll("myRect")
        .data(sortedObjHits)
        .enter()
        .append("rect")
        .attr("x", x(0))
        .attr("y", (d) => y(d.prop))
        .attr("width", (d) => x(d.value))
        .attr("height", y.bandwidth())
        .attr("fill", color);

      // this.svg
      //   .append("g")
      //   .attr("transform", "translate(0," + (divHeight - bottomSpacing) + ")")
      //   .call(d3.axisBottom(x))
      //   .selectAll("text")
      //   .attr("transform", "translate(-10,0)rotate(-45)")
      //   .style("text-anchor", "end");

      this.svg.append("g")
      .attr('class', 'y-axis')
      .call(d3.axisRight(y))
      
    },
    build: function () {
      try {
        this.loading = true;
        this.$services.toolService
          .getFinalDataSet("widget-final-events")
          .then((resp) => {
            this.dataSet = resp;
            this.loading = false;

            setTimeout(() => {
              this.init();
              this.render();
            }, 500);
          });
      } catch (e) {
        console.error("[widget-final-events] getDataSet", e);
        this.loading = false;
      }
    },
  },
  components: {
    // IconBase,
  },
  mounted() {
    // console.log("[widget-prefinal-dummy]] );
    this.build();
    window.addEventListener(
      "resize",
      this.$services.toolService.debounce(this.render)
    );
  },
};
</script>

<style lang="scss">
@import "../../styles/media";

.widget-final-events {

  .y-axis .tick{
    text{
      fill: white;
      font-size: 12px;
    }
  }

}
</style>

<template>
  <div
    :id="id"
    class="widget scrollable widget-final-events"
    :data-cy="$options.name"
  >
    <template v-if="!dataSet && !loading"> NO data</template>
    <template v-if="!dataSet && loading"> loading</template>
    <template v-if="dataSet && !loading">
      <svg :id="`${id}-svg`" :width="attr.width" :height="attr.height"></svg>
    </template>
  </div>
</template>