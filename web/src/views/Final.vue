<script>
import Header from "../components/header.vue";
import WidgetPrefinalDummy from "../components/widgets/widget-prefinal-dummy.vue";

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
    Header,
    WidgetPrefinalDummy
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
      <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">FACEOFFS (winned)</div>
          <WidgetPrefinalDummy teamName="Panthers" propName="faceoff_win" id="dummy1" />
        </div>
      </div>
      <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">FACEOFFS (winned)</div>
          <WidgetPrefinalDummy teamName="Oilers" propName="faceoff_win" id="dummy2" />
        </div>
      </div>

       <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">HITS</div>
          <WidgetPrefinalDummy teamName="Panthers" propName="hit" id="dummy3" />
        </div>
      </div>

      <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">HITS </div>
          <WidgetPrefinalDummy teamName="Oilers" propName="hit" id="dummy4" />
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">GIVEAWAY </div>
          <WidgetPrefinalDummy teamName="Panthers" propName="giveaway" id="dummy21" />
        </div>
      </div>
      <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">GIVEAWAY </div>
          <WidgetPrefinalDummy teamName="Oilers" propName="giveaway" id="dummy22" />
        </div>
      </div>

       <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">TAKEAWAY</div>
          <WidgetPrefinalDummy teamName="Panthers" propName="takeaway" id="dummy23" />
        </div>
      </div>

      <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">TAKEAWAY </div>
          <WidgetPrefinalDummy teamName="Oilers" propName="takeaway" id="dummy24" />
        </div>
      </div>
    </div>



    <div class="row">
      <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">PENALTY </div>
          <WidgetPrefinalDummy teamName="Panthers" propName="penalty" id="dummy31" />
        </div>
      </div>
      <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">PENALTY </div>
          <WidgetPrefinalDummy teamName="Oilers" propName="penalty" id="dummy32" />
        </div>
      </div>

      
    </div>


    

  </div>
</template>