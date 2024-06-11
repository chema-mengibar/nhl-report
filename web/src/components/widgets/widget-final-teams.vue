<script>

export default {
  inject: ["$services"],
  name: "WidgetFinalTeams",
  props: {
    groupKey: { type: String, default: null },
  },
  data: () => ({
    t: {},
    loading: false,
    dataSet: true,
  }),
  created() {
    this.t = this.$services.localeService.D();
  },
  methods: {
    dummy: function () {
      const _ = this;
    },
  },
  components: {  },
  mounted() {
    // console.log("[widget-group-teams] groupKey:", this.groupKey);
  },
  
};
</script>

<style lang="scss">
@import "../../styles/media";

.widget-final-teams {

  display: flex;
  flex-direction: column;

  flex-grow: 1;

  .teams-wrapper {
    display:flex;
    gap:20px;
    justify-content: space-around;
    align-items: center;
    flex:1;
  }

  .team-item {
    display: flex;
    flex-direction: column;
  }

  .team-logo{
    width:100%;
    max-width: 120px;
    margin-bottom:15px;
  }

  .team-name {
    border-bottom-width: 3px;
    border-bottom-style: solid;
     text-align:center;
    padding-bottom: 7px;
    margin-bottom:7px;
    font-size: 18px;
  }
  

  .round{
    margin-top:15px;
    border-top: 1px solid var(--grey-2_rgb);
    text-align: center;
    padding-top: 15px;
  }
}
</style>

<template>
  <div class="widget-final-teams" :data-cy="$options.name">
    <template v-if="!dataSet && !loading"> NO data </template>
    <template v-if="!dataSet && loading"> loading </template>
    <template v-if="dataSet && !loading">
      <div class="teams-wrapper">
        <div class="team-item" >
          <img class="team-logo" :src="`./assets/logos/Oilers.png`"/>
          <div  class="team-name team-border Oilers">Oilers</div>
        </div>
        <div>
          vs
        </div>
        <div class="team-item" >
          <img class="team-logo" :src="`./assets/logos/Panthers.png`"/>
          <div  class="team-name team-border Panthers">Panthers</div>
        </div>
      </div>


    </template>
  </div>
</template>