<script>
// import IconBase from "../icons/icon-base.vue";

export default {
  inject: ["$services"],
  name: "WidgetShotsTotal",
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
  components: {
    // IconBase,
  },
  mounted() {
    console.log("[widget-shots-total] groupKey:", this.groupKey);
  },
  watch: {
    groupKey: function (newVal, oldVal) {
      if (newVal) {
        try {
          this.$services.toolService
            .getDataSet(newVal, "widget-shots-total")
            .then((resp) => {
              this.dataSet = resp;
            })
            .finally(() => {
              this.loading = false;
            });
        } catch (e) {
          console.error("[widget-shots-total] getDataSet", e);
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

.widget-shots-total {
  @include desktop {
    //
  }
}
</style>

<template>
  <div class="widget-shots-total" :data-cy="$options.name">
    <template v-if="!dataSet && !loading"> NO data </template>
    <template v-if="!dataSet && loading"> loading </template>
    <template v-if="dataSet && !loading"> !! </template>
  </div>
</template>