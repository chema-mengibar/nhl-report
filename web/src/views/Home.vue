<script>
import Header from "../components/header.vue";
import WidgetShotsCounter from "../components/widgets/widget-shots-counter.vue";
import WidgetGroupTeams from "../components/widgets/widget-group-teams.vue";
import HeadlineTeams from "../components/content/headline-teams.vue";
import WidgetShotsTotal from "@/components/widgets/widget-shots-total.vue";
import WidgetShotsArea from "@/components/widgets/widget-shots-area.vue";
import WidgetShotsDistance from "@/components/widgets/widget-shots-distance.vue";
import WidgetShotsTypes from "@/components/widgets/widget-shots-types.vue";

export default {
  name: "Home",
  inject: ["$services"],
  data: () => ({
    t: () => {},
    groupKey: null,
    isLoading: true,
    numGames: 0
  }),
  methods: {
    check: function () {
      const groupId = this.$route.params.groupId;
      if (groupId) {
        const { found, key } = this.$services.toolService.checkGroupId(groupId);
        if (found) {
          this.groupKey = key;

          this.$services.toolService.getSerieNumGames(groupId, true).then( resp =>{
            this.numGames = resp
          })
          
        } else {
          this.groupKey = null;
          this.numGames = [];
        }
      }
    },
  },
  created() {
    this.t = this.$services.localeService.t();
  },
  mounted() {
    this.check();
  },
  components: {
    WidgetShotsTypes,
    WidgetShotsDistance,
    WidgetShotsArea,
    WidgetShotsTotal,
    Header,
    WidgetShotsCounter,
    WidgetGroupTeams,
    HeadlineTeams,
  },
  watch: {
    $route(to, from) {
      this.check();
    },
  },
};
</script>

<style lang="scss">
@import "../styles/media";
</style>

<template>
  <Header />
  <div class="app-layout-body dashboard">
    <div class="row">
      <div class="col-12-md col-3">
        <div class="cell">
          <div class="cell-header">TEAMS</div>
          <WidgetGroupTeams :groupKey="groupKey" />
        </div>
      </div>

      <div class="col-12-md col-9">
        <div class="cell">
          <div class="cell-header">PLACEHOLDER</div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="cell">
          <div class="cell-header">WidgetShotsTypes</div>
          <WidgetShotsTypes  :groupKey="groupKey"/>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="cell">
          <div class="cell-header">WidgetShotsArea</div>
          <WidgetShotsArea  :groupKey="groupKey"/>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="cell">
          <div class="cell-header">WidgetShotsDistance</div>
          <WidgetShotsDistance  :groupKey="groupKey"/>
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-12">
        <div class="cell">
          <div class="cell-header">WidgetShotsTotal</div>
          <WidgetShotsTotal  :groupKey="groupKey"/>
        </div>
      </div>
    </div>

    <div class="row scrollable">
      <div
        class="col-md-6 col-3"
        v-bind:key="`WidgetShotsCounter_${groupKey}_${idx}`"
        v-for="idx in this.numGames"
      >
        <div class="cell h2">
          <div class="cell-header">SHOTS COUNTER by GAME: {{ idx}}</div>
          <WidgetShotsCounter
            :gameIdx="idx - 1"
            :id="`shots-counter_${groupKey}_${idx}`"
            :groupKey="groupKey"
          />
        </div>
      </div>
    </div>
  </div>
</template>