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


</style>

<template>
  <Header/>
  <div class="app-layout-body dashboard">

    <div class="row">
      <div class="col">
        <div class="cell h0 color-none">
          <h2> Game 2</h2>
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

    <div class="row">
      <div class="col ">
        <div class="row">
          <div class="cell">
            <div class="cell-header">
              TODAY´S FOCUS
            </div>
            <Widget01 id="a1" reportId="shoots-counter_round-1_Canucks-Predators" :gameIdx="0"/>
          </div>
        </div>
        <div class="row">
          <div class="cell">
            <div class="cell-header">
              TODAY´S FOCUS
            </div>
            <Widget01 id="a2" reportId="shoots-counter_round-1_Canucks-Predators" :gameIdx="0"/>
          </div>
        </div>
      </div>
      <div class="col ">
        <div class="cell h1">
          <div class="cell-header">
            TODAY´S FOCUS
          </div>
          <Widget01 id="c" reportId="shoots-counter_round-1_Canucks-Predators" :gameIdx="0"/>
        </div>
      </div>
      <div class="col w50">
        <div class="cell h1">
          <div class="cell-header">
            TODAY´S FOCUS
          </div>
          <Widget01 id="d" reportId="shoots-counter_round-1_Canucks-Predators" :gameIdx="0"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col w50">
        <div class="cell h2">
          <div class="cell-header">
            TODAY´S FOCUS
          </div>
          <Widget01 id="e" reportId="shoots-counter_round-1_Canucks-Predators" :gameIdx="0"/>
        </div>
      </div>
      <div class="col w50">
        <div class="row">
          <div class="col w50">
            <div class="cell h1">F</div>
          </div>
          <div class="col w50">
            <div class="cell  h1">G</div>
          </div>
        </div>
        <div class="row">
          <div class="cell">H</div>
        </div>
      </div>
    </div>


    <div class="row">
      
      <div class="col w75">
        <div class="cell h2">
          <div class="cell-header">
            TODAY´S FOCUS
          </div>
          <Widget01 id="dfdge" reportId="shoots-counter_round-1_Canucks-Predators" :gameIdx="0"/>
        </div>
      </div>
      
      <div class="col">
        <div class="row">
          <div class="col w50">
            <div class="cell h1">F1</div>
          </div>
          <div class="col w50">
            <div class="cell  h1">G1</div>
          </div>
        </div>
        <div class="row">
          <div class="cell">H1</div>
        </div>
      </div>
    </div>


    <div class="row">

      <div class="col w75">
        <div class="cell h2">
          <div class="cell-header">
            TODAY´S FOCUS
          </div>
          <Widget01 id="dfdguoiue" reportId="shoots-counter_round-1_Canucks-Predators" :gameIdx="0"/>
        </div>
      </div>

      <div class="col">
        <div class="row">
         
            <div class="cell">F</div>
         
  
        </div>
      
      </div>
    </div>
    
    <div class="row">
      <div class="col">
        <div class="cell h1">
          <div class="cell-header">
            TODAY´S FOCUS
          </div>
          <Widget01 id="h" reportId="shoots-counter_round-1_Canucks-Predators" :gameIdx="0"/>
        </div>
      </div>
    </div>


  </div>
</template>