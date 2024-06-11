<script>
import Header from "../components/header.vue";
import WidgetPrefinalSpider from "../components/widgets/widget-prefinal-spider.vue";

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
    WidgetPrefinalSpider
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
          <WidgetPrefinalSpider  id="dummy1" />
        </div>
      </div>
      </div>
      

  </div>
</template>