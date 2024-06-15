<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import WidgetShotsCounter from "@/components/widgets/widget-shots-counter.vue";
import WidgetGroupTeams from "@/components/widgets/widget-group-teams.vue";
import HeadlineTeams from "@/components/content/headline-teams.vue";
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
    numGames: 0,
    
  }),
  methods: {
    unwatch : ()=>{},
    getDefaultData: function () {
      // const groupId = this.$services.toolService.getRoundGroups(3)[0];
      this.$router.push("/final"); // + groupId
    },
    check: function () {

      if(this.$route.name !== 'Home'){
        return
      }
      const groupId = this.$route.params.groupId;
      if (groupId) {
        const { found, key } = this.$services.toolService.checkGroupId(groupId);
        if (found) {
          this.groupKey = key;

          this.$services.toolService
            .getSerieNumGames(groupId, true)
            .then((resp) => {
              this.numGames = resp;
            });
        } else {
          this.getDefaultData();
        }
      } else {
        this.getDefaultData();
      }
    },
  },
  created() {
    this.t = this.$services.localeService.t();
  },
  mounted() {
    this.check();

    this.unwatch =  this.$watch('$route', function(newVal, oldVal) {
      this.check();
    })
  },
  beforeUnmount() {
    // todo: check this , not works
    this.unwatch()
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
    Footer
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
          <div class="cell-header">SERIE</div>
          <WidgetGroupTeams :groupKey="groupKey" />
        </div>
      </div>

      <div class="col-12-md col-9">
        <div class="cell h1">
          <div class="cell-header">SHOTS : MISSED / SAVED</div>
          <WidgetShotsTotal
            :id="`shots-total_${groupKey}`"
            :groupKey="groupKey"
          />
        </div>
      </div>
    </div>

        <div class="row">
      <div class="col-12-md col-6">
        <div class="cell h0">
          <WidgetShotsArea
            :id="`shots-area_${groupKey}`"
            :groupKey="groupKey"
          />
        </div>
      </div>

      <div class="col-6-md col-3">
        <div class="cell h0">
          <WidgetShotsDistance
            teamKey="team_a"
            :id="`shots-distance-1_${groupKey}`"
            :groupKey="groupKey"
          />
        </div>
      </div>
      <div class="col-6-md col-3">
        <div class="cell h0">
          <WidgetShotsDistance
            teamKey="team_b"
            :id="`shots-distance-2_${groupKey}`"
            :groupKey="groupKey"
          />
        </div>
      </div>
    </div>

    <div class="row scrollable">
      <div
        class="col-9-sm col-9-md col-3"
        v-bind:key="`WidgetShotsCounter_${groupKey}_${idx}`"
        v-for="idx in this.numGames"
      >
        <div class="cell h2">
          <div class="cell-header">SHOTS COUNTER by GAME: {{ idx }}</div>
          <WidgetShotsCounter
            :gameIdx="idx - 1"
            :id="`shots-counter_${groupKey}_${idx}`"
            :groupKey="groupKey"
          />
        </div>
      </div>
    </div>

    
  </div>
  <Footer />
</template>