<script>
import Header from "../components/header.vue";
import WidgetPrefinalDummy from "../components/widgets/widget-prefinal-dummy.vue";
import WidgetPrefinalSpider from "../components/widgets/widget-prefinal-spider.vue";
import WidgetFinalTeams from "../components/widgets/widget-final-teams.vue";
import WidgetFinalShotsCounter from "../components/widgets/widget-final-shots-counter.vue";
import WidgetFinalShotsDistance from "@/components/widgets/widget-final-shots-distance.vue";


export default {
  name: "Final",
  inject: ["$services"],
  data: () => ({
    t: () => {
    },
    isLoading: true,
    numGames: 0,
  }),
  methods: {},
  created() {
    this.t = this.$services.localeService.t();
  },
  mounted() {
  },
  components: {
    WidgetFinalShotsDistance,
    Header,
    WidgetPrefinalDummy,
    WidgetPrefinalSpider,
    WidgetFinalTeams,
    WidgetFinalShotsCounter

  },
  watch: {},
};
</script>

<style lang="scss">
@import "../styles/media";
</style>

<template>
  <Header/>
  <div class="app-layout-body dashboard">

    <div class="row">
      <div class="col-12">
        <h2>Final</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-12-md col-6">
        <div class="cell h2">
          <div class="cell-header">TEAMS</div>
          <WidgetFinalTeams id="final-teams"/>
        </div>
      </div>
      <div class="col-12-md col-6">
        <div class="cell h2">
          <div class="cell-header">TEAM COMPARISON (in Playoffs)</div>
          <WidgetPrefinalSpider id="spider-1"/>
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">PENALTIES (in Playoffs)</div>
          <WidgetPrefinalDummy teamName="Panthers" propName="penalty" id="penalty1"/>
        </div>
      </div>
      <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">PENALTIES (in Playoffs)</div>
          <WidgetPrefinalDummy teamName="Oilers" propName="penalty" id="penalty2"/>
        </div>
      </div>

      <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">HITS (in Playoffs)</div>
          <WidgetPrefinalDummy teamName="Panthers" propName="hit" id="hit1"/>
        </div>
      </div>
      <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">HITS (in Playoffs)</div>
          <WidgetPrefinalDummy teamName="Oilers" propName="hit" id="hit2"/>
        </div>
      </div>


    </div>


    <div class="row">
      <div class="col-12">
        <h2>Final Games</h2>
      </div>
    </div>

    
    <div class="row">
      <div class="col-12-md col-3">
        <div class="cell h0">
          <WidgetFinalShotsDistance
              teamKey="team_a"
              :id="`shots-distance-1`"

          />
        </div>
      </div>
      <div class="col-12-md col-3">
        <div class="cell h0">
          <WidgetFinalShotsDistance
              teamKey="team_b"
              :id="`shots-distance-2`"
          />
        </div>
      </div>

      <div class="col-12-md col-6">
        <div class="row scrollable">
          <div
              class="col-9-sm col-9-md col-3"
              v-bind:key="`WidgetFinalShotsCounter_${idx}`"
              v-for="idx in [0,1]"
          >
            <div class="cell h2">
              <div class="cell-header with-legend">
                SHOTS by GAME: {{ idx + 1 }}
                <small>(saved, missed, goal)</small>
              </div>
              <WidgetFinalShotsCounter
                  :gameIdx="idx"
                  :id="`widget-final-shots-counter_${idx}`"
                  groupKey="Oilers-Panthers"
              />
            </div>
          </div>
        </div>
      </div>
    </div>




   


  </div>
</template>