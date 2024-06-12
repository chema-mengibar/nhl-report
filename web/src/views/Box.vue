<script>
import Header from "../components/header.vue";
import WidgetFinalShotsCounter from "../components/widgets/widget-final-shots-counter.vue";

export default {
  name: "Box",
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
    WidgetFinalShotsCounter 
  },
  watch: {},
};
</script>

<style lang="scss">
@import "../styles/media";
</style>

<template>

  <div class="app-layout-body dashboard">


    <div class="row">
      <div class="col-12-md col-3">
        <div class="cell h2">
          <div class="cell-header">-</div>
         <WidgetFinalShotsCounter
            :gameIdx="1"
            :id="`widget-final-shots-counter`"
            groupKey="Oilers-Panthers"
          />
        </div>
      </div>
      </div>
      

  </div>
</template>