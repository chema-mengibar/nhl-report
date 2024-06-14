<script>
import * as d3 from "d3";
import {toRaw} from "vue";
import Goal from "@/components/content/goal.vue";

export default {
  inject: ["$services"],
  name: "WidgetPrefinalGoalie",
  props: {
    id: {type: String, default: null},
    goalieIdx: {type: Number, default: 0},
    teamKey: {type: String, default: "team_a", required: true},

  },
  data: () => ({
    t: {},
    loading: true,
    dataSet: null,
    goalieName: '',
    maxGoalsXArea: 0,
    areas: null,
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
    init: function () {
      this.svg = d3.select(`#${this.id}-svg`);
    },
    render: function () {
      const container = document.getElementById(this.id);
      if (container) {

        this.w = (document.getElementById(this.id).offsetWidth) * 0.8;
        this.h = (document.getElementById(this.id).offsetHeight)* 0.8;
      }

      this.goalieName = Object.keys(this.dataSet[this.teamKey])[this.goalieIdx]


      // Counter

      const _areas = {
        lower_left: 0,
        lower_middle: 0,
        lower_right: 0,
        upper_left: 0,
        upper_middle: 0,
        upper_right: 0,
      }

      let _maxGoalsXArea = 0;

      const goalieEvents = this.dataSet[this.teamKey][this.goalieName].events;
      goalieEvents.forEach(event => {
        if (event.type === 'goal') {
          
          if(!this.numGames.includes(event.game)){
            this.numGames.push(event.game)
          }

          const goal_zone = event.goal_zone.replace(' ', '_');
          if (goal_zone in _areas) {
            _areas[goal_zone] += 1

            _maxGoalsXArea = Math.max(_maxGoalsXArea, _areas[goal_zone])
          }
        }
      })

      console.log(_maxGoalsXArea)

      // Colors

      const _areasColors = {
        lower_left: null,
        lower_middle: null,
        lower_right: null,
        upper_left: null,
        upper_middle: null,
        upper_right: null,
      }


      const colors = d3
          .scaleLinear()
          .domain([0, Math.round(_maxGoalsXArea/2)  , _maxGoalsXArea])
          .range(['#047200', '#ffc400', '#ff0000']);

      Object.entries(_areas).forEach(([entryKey, entryValue]) => {
        _areasColors[entryKey] = colors(entryValue)
      })


      Object.entries(_areas).forEach(([entryKey, entryValue]) => {
        _areasColors[entryKey] = colors(entryValue)
      })


      this.areas = _areasColors
      this.maxGoalsXArea = _maxGoalsXArea


    },
    build: function () {
      try {

        this.loading = true;
        this.$services.toolService
            .getFinalDataSet("widget-prefinal-goalies")
            .then((resp) => {
              this.dataSet = resp;
              this.loading = false;
              setTimeout(() => {
                this.init();
                this.render();
              }, 500);
            });
      } catch (e) {
        console.error("[widget-prefinal-goalie] getDataSet", e);
        this.loading = false;
      }
    },
  },
  components: {
    Goal,
  },
  mounted() {
    // console.log("[widget-prefinal-goalie] groupKey:", this.groupKey);
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

.widget-prefinal-goalie {

  .team-name {
    margin: 0 20px 7px;
    padding-bottom: 7px;
    text-align: center;
    color: white;
    min-width: 50%;
    line-height: 22px;
  }

  .team-border {
    border-bottom-width: 3px;
    border-bottom-style: solid;
  }
}
</style>

<template>
  <div :id="id" class="widget widget-prefinal-goalie" :data-cy="$options.name">
    <template v-if="!dataSet && !loading"> NO data</template>
    <template v-if="!dataSet && loading"> loading</template>
    <template v-if="dataSet && !loading">
      <div class="cell-header">
        <span>GOALS CONCEDED (in Series)</span>
      </div>

      <div class="cell-body" v-show="show">
        <div
            class="team-name team-border"
            :class="{  [teamKey ]: true }"
        >
          {{ goalieName }} ,{{teamKey}} 
          <br/> {{maxGoalsXArea}} goals  in {{this.numGames.length}} games
        </div>
        <Goal :areas="areas" :w="w" :h="h" :id="`${id}-svg`"/>
      </div>

    </template>
  </div>
</template>