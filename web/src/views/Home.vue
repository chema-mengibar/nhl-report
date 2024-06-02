<script>
import Header from "../components/header.vue";
import WidgetShotsCounter from "../components/widgets/widget-shots-counter.vue";
import WidgetGroupTeams from "../components/widgets/widget-group-teams.vue";
import HeadlineTeams from "../components/content/headline-teams.vue";

export default {
  name: "Home",
  inject: ["$services"],
  data: () => ({
    t: () => {},
    groupKey: null,
    isLoading: true,
  }),
  methods: {},
  created() {
    this.t = this.$services.localeService.t();
  },
  mounted() {
    const groupId = this.$route.params.groupId;
    if(groupId){
      const {found, key} = this.$services.toolService.checkGroupId(groupId);
      if(found){
        this.groupKey = key;
      }
      else{
        this.groupKey = null
      }
    }
  },
  components: {
    Header,
    WidgetShotsCounter,
    WidgetGroupTeams,
    HeadlineTeams
  },
};
</script>

<style lang="scss">
@import "../styles/media";


</style>

<template>
  <Header/>
  <div class="app-layout-body dashboard ">

    <div class="row">
      <div class="col-12-md col-3">
        <div class="cell">
          <div class="cell-header">
            TEAMS
          </div>
          <WidgetGroupTeams :groupKey="groupKey" />
        </div>
      </div>

       <div class="col-12-md col-9">
        <div class="cell">
          <div class="cell-header">
            PLACEHOLDER
          </div>

         
          
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12-sm  col-6-md col-3" v-bind:key="idx" v-for=" idx in  [0,1,2,3] ">
        <div class="cell h2">
          <div class="cell-header">
             SHOTS COUNTER by GAME: {{ idx + 1 }}
          </div>
           <WidgetShotsCounter  :gameIdx="idx" :id="`shots-counter_${groupKey}_${idx}`" :groupKey="groupKey" />    
        </div>
      </div>

    </div>
  </div>
</template>