<script>

import * as d3 from "d3";
import {toRaw} from "vue";

export default {
  inject: ["$services"],
  name: "WidgetPrefinalSpider",
  props: {
    id: {type: String, default: null},
  },
  data: () => ({
    t: {},
    loading: true,
    dataSet: null,
    dataFetched: null,
    svgTools: {
      scaleFctProps: null,
      maxValues: null,
      maxRadius: 0
    },
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

      const divWidth = document.getElementById(this.id).offsetWidth ;
      const divHeight = document.getElementById(this.id).offsetHeight ;

      this.attr.width = divWidth ;
      this.attr.height = divHeight;
      this.attr.viewBox = `0 0 ${divWidth} ${divHeight}`;


      const center = {
        x: divWidth / 2,
        y: divHeight / 2
      }

      const categories = Object.keys(this.svgTools.maxValues);
      const difAngle = 360 / categories.length
      const categoriesAngles = categories.map((key, idx) => ({key, angle: (idx * difAngle) - 90}));
      const x = (radius, angle) => radius * Math.cos(Math.PI * 2 * angle / 360);
      const y = (radius, angle) => radius * Math.sin(Math.PI * 2 * angle / 360);


      const line = {
        width: 0.5,
        opacity: 0.2,
      }

      const loop = this.svg
          .selectAll()
          .data([1, 0.75, 0.5, 0.25])
          .enter()

      loop.append("polygon")
          .attr('points', (d) => {
            const points = [];
            categoriesAngles.forEach(catAngleItem => {
              const r = d * this.svgTools.maxRadius
              const _x = center.x + x(r, catAngleItem.angle)
              const _y = center.y + y(r, catAngleItem.angle)
              points.push([_x, _y])
            })

            return points.map(pItem => pItem.join(',')).join(' ')
          })
          .attr('fill', 'transparent')
          .attr('stroke', 'white')
          .attr('stroke-width', line.width)
          .attr('stroke-opacity', line.opacity);


      ['Panthers', 'Oilers'].forEach(teamKey => {
        const points = []

        categoriesAngles.forEach(catAngleItem => {
          const prop = catAngleItem.key
          const scale = this.svgTools.scaleFctProps[prop];
          const r = scale(this.dataSet[teamKey][prop])

          const _x = center.x + x(r, catAngleItem.angle)
          const _y = center.y + y(r, catAngleItem.angle)

          points.push([_x, _y])
        })

        const strPoints = points.map(pItem => pItem.join(',')).join(' ')
        const color = this.$services.toolService.getTeamColor(teamKey);
        this.svg
            .append('polygon')
            .attr('points', strPoints)
            .attr('stroke', color)
            .attr('stroke-width', 5)
            .attr('fill-opacity', 0)
      })


      categoriesAngles.forEach(catAngleItem => {
        const r = this.svgTools.maxRadius
        const _x = center.x + x(r, catAngleItem.angle)
        const _y = center.y + y(r, catAngleItem.angle)

        this.svg.append('line')
            .attr('x2', _x)
            .attr('y2', _y)
            .attr('x1', center.x)
            .attr('y1', center.y)
            .attr('stroke', 'white')
            .attr('stroke-width', line.width)
            .style('opacity', line.opacity);
      })


      this.svg
          .selectAll()
          .data(categoriesAngles)
          .enter()
          .append('text')
          .attr("x", (d) => {
            return center.x + x(this.svgTools.maxRadius - 10, d.angle)
          })
          .attr("y", (d) => {
            return center.y + y(this.svgTools.maxRadius - 10, d.angle)
          })
          .attr("dy", ".35em")
          .attr('text-anchor', 'middle')
          .attr('fill', 'white')
          .text((d) => {
            return d.key
          });



      Object.entries(this.svgTools.maxValues).forEach(([entryKey, entryValue]) => {


        [ 0.75, 0.5, 0.25].forEach(div => {
          const r = this.svgTools.scaleFctProps[entryKey](entryValue * div)

          const catItem = categoriesAngles.find(i => i.key === entryKey)
          const _x = center.x + x(r, catItem.angle)
          const _y = center.y + y(r, catItem.angle)

          this.svg
              .append('text')
              .attr("x", _x)
              .attr("y", _y)
              .attr("class", 'text-div')
              .attr("dy", ".35em")
              .attr('text-anchor', 'middle')
              .attr('fill', 'white')
              .text(Math.floor(this.svgTools.maxValues[entryKey] * div));

        })
        
      })


    },

    prepare: function () {
      const _dataSet = {
        Oilers: this.mapTeamData('Oilers'),
        Panthers: this.mapTeamData('Panthers'),
      };


      const _maxValues = {};
      ['Oilers', 'Panthers'].forEach(teamKey => {
        Object.entries(_dataSet[teamKey]).forEach(([propKey, propValue]) => {
          if (!(propKey in _maxValues)) {
            _maxValues[propKey] = propValue
          } else {
            _maxValues[propKey] = Math.max(_maxValues[propKey], propValue)
          }
        })
      })

      Object.entries(_maxValues).forEach( ([k,v]) =>{
        _maxValues[k] = Math.round(v / 10) * 12
      })

      const limitW = document.getElementById(this.id).offsetWidth;
      const limitH = document.getElementById(this.id).offsetHeight
      const limit = Math.min(limitH, limitW) -30

      const radiusMax = limit / 2

      const _scaleFctProps = {}
      Object.entries(_maxValues).forEach(([entryKey, entryValue]) => {
        _scaleFctProps[entryKey] = d3.scaleLinear()
            .domain([0, entryValue])
            .range([0, radiusMax])
      })


      this.dataSet = _dataSet
      this.svgTools = {
        maxValues: _maxValues,
        scaleFctProps: _scaleFctProps,
        maxRadius: radiusMax,

      }

    },
    build: function () {
      try {

        this.loading = true;
        this.$services.toolService
            .getFinalDataSet("widget-prefinal-events")
            .then((resp) => {
              this.dataFetched = resp;
              this.loading = false;

              setTimeout(() => {
                this.init();
                this.prepare();
                this.render();
              }, 500);
            });
      } catch (e) {
        console.error("[widget-prefinal-spider] getDataSet", e);
        this.loading = false;
      }
    },
    mapTeamData: function (teamName) {
      const obj = {}

      const teamData = this.dataFetched[teamName];

      Object.entries(teamData).forEach(([playername, playerData]) => {
        playerData.forEach(playerEvent => {
          if (!(playerEvent.type in obj)) {
            obj[playerEvent.type] = 1
          } else {
            obj[playerEvent.type] += 1
          }
        })
      });
      return obj;
    },

  },
  components: {},
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

.widget-prefinal-spider {
  .text-div {
    font-size: 11px;
    fill: white;
    fill-opacity: 0.5;
  }
}
</style>

<template>
  <div :id="id" class="widget scrollable widget-prefinal-spider" :data-cy="$options.name">
    <template v-if="!dataFetched && !loading"> NO data</template>
    <template v-if="!dataFetched && loading"> loading</template>
    <template v-if="dataFetched && !loading">
      <svg
          :id="`${id}-svg`"
          :width="attr.width"
          :height="attr.height"

      ></svg>
    </template>
  </div>
</template>