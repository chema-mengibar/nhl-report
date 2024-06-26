<script>
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";
import WidgetPrefinalEvents from "../components/widgets/widget-prefinal-events.vue";
import WidgetFinalEvents from "../components/widgets/widget-final-events.vue";
import WidgetPrefinalSpider from "../components/widgets/widget-prefinal-spider.vue";
import WidgetFinalSpider from "../components/widgets/widget-final-spider.vue";
import WidgetFinalTeams from "../components/widgets/widget-final-teams.vue";
import WidgetFinalShotsCounter from "../components/widgets/widget-final-shots-counter.vue";
import WidgetFinalShotsDistance from "@/components/widgets/widget-final-shots-distance.vue";
import WidgetPrefinalGoalie from "@/components/widgets/widget-prefinal-goalie.vue";

export default {
  name: "Final",
  inject: ["$services"],
  data: () => ({
    t: () => {},
    isLoading: true,
    numGames: 0,
  }),
  methods: {},
  created() {
    this.t = this.$services.localeService.t();
  },
  mounted() {},
  components: {
    WidgetPrefinalGoalie,
    WidgetFinalShotsDistance,
    Header,
    WidgetPrefinalEvents,
    WidgetFinalEvents,
    WidgetPrefinalSpider,
    WidgetFinalSpider,
    WidgetFinalTeams,
    WidgetFinalShotsCounter,
    Footer,
  },
  watch: {},
};
</script>

<style lang="scss">
@import "../styles/media";
</style>

<template>
  <Header />
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
          <WidgetFinalTeams id="final-teams" />
        </div>
      </div>
      <div class="col-12-md col-6">
        <div class="cell h2">
          <div class="cell-header">TEAM COMPARISON (in Playoffs)</div>
          <WidgetPrefinalSpider id="spider-1" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">PENALTIES (in Playoffs)</div>
          <WidgetPrefinalEvents
            teamName="Panthers"
            propName="penalty"
            id="penalty1"
          />
        </div>
      </div>
      <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">PENALTIES (in Playoffs)</div>
          <WidgetPrefinalEvents
            teamName="Oilers"
            propName="penalty"
            id="penalty2"
          />
        </div>
      </div>

      <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">HITS (in Playoffs)</div>
          <WidgetPrefinalEvents teamName="Panthers" propName="hit" id="hit1" />
        </div>
      </div>
      <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">HITS (in Playoffs)</div>
          <WidgetPrefinalEvents teamName="Oilers" propName="hit" id="hit2" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12-md col-4">
        <div class="cell h1">
          <WidgetPrefinalGoalie
            :id="`widget-prefinal-goalie-1`"
            teamKey="Panthers"
            :goalieIdx="0"
          />
        </div>
      </div>
      <div class="col-12-md col-4">
        <div class="cell h1">
          <WidgetPrefinalGoalie
            :id="`widget-prefinal-goalie-2`"
            teamKey="Oilers"
            :goalieIdx="0"
          />
        </div>
      </div>
      <div class="col-12-md col-4">
        <div class="cell h1">
          <WidgetPrefinalGoalie
            :id="`widget-prefinal-goalie-2`"
            teamKey="Oilers"
            :goalieIdx="1"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <h2>Final Games</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-12-md col-6">
        <div class="cell h1">
          <WidgetFinalShotsDistance teamKey="team_a" :id="`shots-distance-1`" />
        </div>
      </div>
      <div class="col-12-md col-6">
        <div class="cell h1">
          <WidgetFinalShotsDistance teamKey="team_b" :id="`shots-distance-2`" />
        </div>
      </div>
    </div>

    <div class="row scrollable">
      <div
        class="col-9-sm col-9-md col-3"
        v-bind:key="`WidgetFinalShotsCounter_${idx}`"
        v-for="idx in [0, 1, 2, 3, 4, 5, 6]"
      >
        <div class="cell h2">
          <div class="cell-header with-legend">
            SHOTS by GAME: {{ idx + 1 }}
            <small class="legend">
              <span class="finalteams">saved </span>,
              <span class="b-b_missed">missed</span>,
              <span class="b-b_goal">goal</span>
            </small>
          </div>
          <WidgetFinalShotsCounter
            :gameIdx="idx"
            :id="`widget-final-shots-counter_${idx}`"
            groupKey="Oilers-Panthers"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12-md col-3">
        <div class="row">
          <div class="col-12">
            <div class="cell h1">
              <div class="cell-header">PENALTIES (in Final)</div>
              <WidgetFinalEvents
                teamName="Panthers"
                propName="penalty"
                id="penaltyF1"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="cell h1">
              <div class="cell-header">HITS (in Final)</div>
              <WidgetFinalEvents
                teamName="Panthers"
                propName="hit"
                id="hitF1"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-12-md col-3">
        <div class="row">
          <div class="col-12">
            <div class="cell h1">
              <div class="cell-header">PENALTIES (in Final)</div>
              <WidgetFinalEvents
                teamName="Oilers"
                propName="penalty"
                id="penaltyF2"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="cell h1">
              <div class="cell-header">HITS (in Final)</div>
              <WidgetFinalEvents teamName="Oilers" propName="hit" id="hitF2" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-12-md col-6">
        <div class="cell h0">
          <div class="cell-header">TEAM COMPARISON (in Final)</div>
          <WidgetFinalSpider id="spider-2" />
        </div>
      </div>
    </div>

    
  </div>
  <Footer />
</template>