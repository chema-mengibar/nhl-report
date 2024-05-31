<script>
import Header from "../components/header.vue";
import Widget01 from "../components/widgets/widget-01.vue";
import HeadlineTeams from "../components/content/headline-teams.vue";

export default {
  name: "Home",
  inject: ["$services"],
  data: () => ({
    t: () => {
    },
    isLoading: true,
  }),
  methods: {},
  created() {
    this.t = this.$services.localeService.t();
  },
  mounted() {
    setTimeout(() => {
      // this.$router.push({ name: "Menu" });
    }, 4800);
  },
  components: {
    Header,
    Widget01,
    HeadlineTeams
  },
};
</script>

<style lang="scss">
@import "../styles/media";


.legends {
  border: 1px solid var(--grey-2);
  padding: 10px;
  width: fit-content;
  display: flex;
  gap: 20px;

  .legend {
    font-style: italic;
  }

  .legend-color {

    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 10px;
    margin-right: 7px;

    &.missed {
      background-color: var(--color-shotmissed);
    }

    &.goal {
      background-color: var(--color-goal);
    }
  }

}


</style>

<template>
  <Header/>
  <div class="app-layout-body">

    <h1>Shots counter x game </h1>

    <div :set="reportId='shoots-counter_round-1_Canucks-Predators'">

      <br/>
      <div class="dashboard-row">
        <HeadlineTeams :reportId="reportId"/>
      </div>
      <div class="dashboard-row">
        
        <div class="dashboard-cell">
          <Widget01 id="special_0" :reportId="reportId" :gameIdx="1"/>
        </div>
        <div class="dashboard-cell">
          <h2>Explanation</h2>
          <p>
            This graph shows the shots made by each team during the 3 periods of each game. <br/>
            Type "shotsaved", "shotmissed", "goal". <br/>
            Missed shots are specially marked. <br/>
            The order of the scoring in each game is the same as the order of the team names. <br/>
            In this example Canucks 1, Predators 4.
          </p>
        </div>
      </div>
    </div>

    <h2>Legends</h2>
    <div class="legends">
      <small class="legend"><span class="legend-color missed"></span>Missed </small>
      <small class="legend"><span class="legend-color goal"></span>Goal </small>
    </div>

    <h2>Round 1</h2>
    <template v-for="reportId in this.$services.toolService.keysRound1">
      <div class="dashboard-row">
        <HeadlineTeams :reportId="reportId"/>
      </div>
      <div class="dashboard-row">
        <div class="dashboard-cell" v-for=" idx in  this.$services.toolService.getNumGamesByFileId(reportId, true) ">
          <Widget01 :id="`${reportId}__${idx}`" :reportId="reportId" :gameIdx="idx"/>
        </div>
      </div>
    </template>


    <h2>Round 2</h2>
    <template v-for="reportId in this.$services.toolService.keysRound2">
      <div class="dashboard-row">
        <HeadlineTeams :reportId="reportId"/>
      </div>
      <div class="dashboard-row">
        <div class="dashboard-cell" v-for=" idx in  this.$services.toolService.getNumGamesByFileId(reportId, true) ">
          <Widget01 :id="`${reportId}__${idx}`" :reportId="reportId" :gameIdx="idx"/>
        </div>
      </div>
    </template>


  </div>
</template>