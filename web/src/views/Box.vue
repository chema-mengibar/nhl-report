<script>
import Header from "../components/header.vue";
import WidgetPrefinalGoalie from "@/components/widgets/widget-prefinal-goalie.vue";

export default {
  name: "Box",
  inject: ["$services"],
  data: () => ({
    t: () => {
    },
    isLoading: true,
    numGames: 0,
  }),
  methods: {},
  created() {
    this.t = this.$services.localeService.t();
  },
  mounted() {
  },
  components: {
    WidgetPrefinalGoalie,
    Header,
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
        <div class="cell h0">
          <WidgetPrefinalGoalie
              :id="`widget-prefinal-goalie-1`"
              teamKey="Panthers"
              :goalieIdx="0"
          />
        </div>
      </div>
      <div class="col-12-md col-3">
        <div class="cell h0">
          <WidgetPrefinalGoalie
              :id="`widget-prefinal-goalie-2`"
              teamKey="Oilers"
              :goalieIdx="0"
          />
        </div>
      </div>
      <div class="col-12-md col-3">
        <div class="cell h0">
          <WidgetPrefinalGoalie
              :id="`widget-prefinal-goalie-2`"
              teamKey="Oilers"
              :goalieIdx="1"
          />
        </div>
      </div>
    </div>


  </div>
</template>