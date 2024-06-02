<script>
import * as d3 from "d3";

export default {
  inject: ["$services"],
  name: "WidgetShotsCounter",
  props: {
    id: { type: String, default: null },
    groupKey: { type: String, default: null },
    gameIdx: { type: Number, default: 0 },
  },
  data: () => ({
    t: {},
    loading: false,
    dataSet: null,
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
      this.svg = d3.select(`#${this.id}-svg`);
    },
    render: function () {
      this.svg.selectAll("*").remove();

      const divWidth = document.getElementById(this.id).offsetWidth;
      const divHeight = document.getElementById(this.id).offsetHeight;

      // console.log(document.getElementById(this.id))
      // console.log(divWidth, divWidth)

      this.attr.width = divWidth;
      this.attr.height = divHeight;
      this.attr.viewBox = `0 0 ${divWidth} ${divHeight}`;

      const svgData = {
        home: [],
        away: [],
      };

      let maxX = 3600; // seconds in game -> 20*3 * 60
      let maxY = 100;

      const margin = 10;

      const { report, schedule_data } =
        this.dataSet.games_reports[this.gameIdx];

      const colorHome = `var(--color-${report.teams.home.name.replace(
        " ",
        "-"
      )})`;
      const colorAway = `var(--color-${report.teams.away.name.replace(
        " ",
        "-"
      )})`;

      report.shots.home.forEach((shotItem) => {
        let color = null;
        if (shotItem.shot_type === "shotmissed") {
          color = "var(--color-shotmissed)";
        }
        if (shotItem.shot_type === "goal") {
          color = "var(--color-goal)";
        }
        svgData.home.push([
          shotItem.time_game_seconds,
          shotItem.shot_counter_onclock,
          color,
        ]);
        // maxX = Math.max(maxX, shotItem.time_game_seconds)
        // maxY = Math.max(maxY, shotItem.shot_counter_onclock)
      });

      report.shots.away.forEach((shotItem) => {
        let color = null;
        if (shotItem.shot_type === "shotmissed") {
          color = "var(--color-shotmissed)";
        }
        if (shotItem.shot_type === "goal") {
          color = "var(--color-goal)";
        }

        svgData.away.push([
          shotItem.time_game_seconds,
          shotItem.shot_counter_onclock,
          color,
        ]);
        // maxX = Math.max(maxX, shotItem.time_game_seconds)
        // maxY = Math.max(maxY, shotItem.shot_counter_onclock)
      });

      const xScale = d3
        .scaleLinear()
        .domain([0, maxX])
        .range([margin, this.attr.width - margin]);

      const yScale = d3
        .scaleLinear()
        .domain([0, maxY])
        .range([this.attr.height - margin, margin]);

      this.svg
        .append("g")
        .style("color", "var(--grey-3_rgb)")
        .call(d3.axisBottom(xScale));
      this.svg
        .append("g")
        .style("color", "var(--grey-4_rgb)")
        .call(d3.axisRight(yScale));

      var line = d3
        .line()
        .x((d) => xScale(d[0]))
        .y((d) => yScale(d[1]))
        .curve(d3.curveMonotoneX);

      // Period Line
      this.svg
        .append("line")
        .attr("x1", xScale(1200))
        .attr("y1", yScale(0))
        .attr("x2", xScale(1200))
        .attr("y2", yScale(120))
        .style("fill", "none")
        .style("stroke", "var(--grey-3_rgb)")
        .style("stroke-width", 2);

      this.svg
        .append("line")
        .attr("x1", xScale(2400))
        .attr("y1", yScale(0))
        .attr("x2", xScale(2400))
        .attr("y2", yScale(120))
        .style("fill", "none")

        .style("stroke", "var(--grey-3_rgb)")
        .style("stroke-width", 2);

      this.svg
        .append("path")
        .datum(svgData.home)
        .attr("class", "line")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", colorHome)
        .style("stroke-opacity", ".8")
        .style("stroke-width", 4);

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
        .style("stroke-opacity", ".8")
        .style("stroke-width", 4);

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
    build: function () {
      try {
        if (!this.groupKey) {
          return;
        }
        this.loading = true;
        this.$services.toolService
          .getDataSet(this.groupKey, "widget-shots-counter")
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
  components: {},
  mounted() {
    console.log("[widget-shots-counter] groupKey:", this.groupKey);
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

.widget-shots-counter {
  @include desktop {
    //
  }
}
</style>

<template>
  <div :id="id" class="widget widget-shots-counter" :data-cy="$options.name">
    <template v-if="!dataSet && !loading"> NO data </template>
    <template v-else-if="!dataSet && loading"> loading </template>
    <template v-else-if="dataSet && !loading">
      <svg
        :id="`${id}-svg`"
        :width="attr.width"
        :height="attr.height"
        :viewBox="attr.viewBox"
      ></svg>
    </template>
  </div>
</template>