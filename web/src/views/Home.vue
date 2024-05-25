<script>
import Header from "../components/header.vue";
import Widget01 from "../components/widgets/widget-01.vue";
export default {
  name: "Home",
  inject: ["$services"],
  data: () => ({
    t: () => {},
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
  },
};
</script>

<style lang="scss">
@import "../styles/media";
</style>

<template>
  <Header />
  <div class="app-layout-body">
    <div class="dashboard-row">
      <div class="dashboard-cell">
        <Widget01 id="a" />
      </div>
     
    </div>
  </div>
</template>