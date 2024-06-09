<script>

import * as d3 from "d3";
import { toRaw } from "vue";

export default {
  inject: ["$services"],
  name: "WidgetPrefinalDummy",
  props: {
    id: { type: String, default: null },
  },
  data: () => ({
    t: {},
    loading: true,
    dataSet: null,
    svg: null,
    attr: {
      width: 0,
      height: 0,
      viewBox: '', //"0 0 0 0",
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
    },
  }),
  created() {
    this.t = this.$services.localeService.D();
  },
  methods: {
    init: function () {
      this.svg = d3.select(`#${this.id}-svg`);
    },
    render: function () {
      this.svg.selectAll("*").remove();

      const divWidth = document.getElementById(this.id).offsetWidth;
      const divHeight = document.getElementById(this.id).offsetHeight;

      this.attr.width = divWidth;
      this.attr.height = divHeight;
      this.attr.viewBox = `0 0 ${divWidth} ${divHeight}`;

      console.log(toRaw(this.dataSet))
  
    },
    build: function () {
      try {
       
        this.loading = true;
        this.$services.toolService
          .getFinalDataSet( "widget-prefinal-events")
          .then((resp) => {
            this.dataSet = resp;
            this.loading = false;

            setTimeout(() => {
              this.init();
              this.render();
            }, 500);
          });
      } catch (e) {
        console.error("[widget-prefinal-dummy] getDataSet", e);
        this.loading = false;
      }
    },
  },
  components: {
    // IconBase,
  },
  mounted() {
    // console.log("[widget-prefinal-dummy]] );
    this.build();
    window.addEventListener(
      "resize",
      this.$services.toolService.debounce(this.render)
    );
  },

};
</script>

<style lang="scss">
@import "../../styles/media";

.widget-shots-total {
  @include desktop {
    //
  }
}
</style>

<template>
  <div :id="id" class="widget scrollable widget-prefinal-dummy" :data-cy="$options.name">
    <template v-if="!dataSet && !loading"> NO data</template>
    <template v-if="!dataSet && loading"> loading</template>
    <template v-if="dataSet && !loading">
      <svg
        :id="`${id}-svg`"
        :width="attr.width"
        :height="attr.height"
 
      ></svg>
    </template>
  </div>
</template>