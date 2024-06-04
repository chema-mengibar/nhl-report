<script>

export default {
  inject: ["$services"],
  name: "WidgetGroupTeams",
  props: {
    groupKey: { type: String, default: null },
  },
  data: () => ({
    t: {},
    loading: true,
    dataSet: null,
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
    console.log("[widget-group-teams] groupKey:", this.groupKey);
  },
  watch: {
    groupKey: function (newVal, oldVal) {
      if (newVal) {
        console.log('--->' , newVal)
        try {
          this.$services.toolService
            .getDataSet(newVal, "widget-group-teams")
            .then((resp) => {
              this.dataSet = resp;
              console.log(resp)
            })
            .finally(() => {
              this.loading = false;
            });
        } catch (e) {
          console.error("[widget-group-teams] getDataSet", e);
          this.loading = false;
        }
      } else {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/media";

.widget-group-teams {

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
    max-width: 75px;
    margin-bottom:7px;
  }

  .team-name {
    border-bottom-width: 3px;
    border-bottom-style: solid;
     text-align:center;
    padding-bottom: 7px;
    margin-bottom:7px;
    font-size: 18px;
  }

  .team-lead {
    font-size: 25px;
    text-align:center;
    font-weight: bold;
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
  <div class="widget-group-teams" :data-cy="$options.name">
    <template v-if="!dataSet && !loading"> NO data </template>
    <template v-if="!dataSet && loading"> loading </template>
    <template v-if="dataSet && !loading">
      <div class="teams-wrapper">
        <div class="team-item" >
          <img class="team-logo" :src="`./assets/logos/${dataSet.teams.a}.png`"/>
          <div class="team-name" :class="{'team-border': true, [dataSet.teams.a]: true}">{{ dataSet.teams.a }}</div>
          <div class="team-lead">{{ dataSet.lead_result.a }}</div>
        </div>
           <div class="team-item" >
            <img class="team-logo" :src="`./assets/logos/${dataSet.teams.b}.png`"/>
          <div class="team-name" :class="{'team-border': true, [dataSet.teams.b]: true}">{{ dataSet.teams.b }}</div>
          <div class="team-lead">{{ dataSet.lead_result.b }}</div>
        </div>
      </div>

      <div class="round">ROUND: {{ dataSet.round }}</div>
    </template>
  </div>
</template>