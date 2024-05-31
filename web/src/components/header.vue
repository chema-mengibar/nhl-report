<script>
import Logo from './logo.vue'
import IconBars from "../components/icons/icon-bars.vue";

export default {
  inject: ['$services'],
  name: 'Header',
  props: {},
  data: () => ({
    t: {}
  }),
  created() {
    this.t = this.$services.localeService.D();
  },
  methods: {
    goHome: function () {

      this.$router.push({name: 'Home', query: {...this.$route.query}})
    },
    goToMenu: function () {

      // this.$router.push({ name: 'Menu', query: { ...this.$route.query } })
    },
  },
  components: {
    Logo,
    IconBars,
  },
  computed: {},
  mounted() {
    //
  },

}
</script>

<style lang="scss">

@import '../styles/media';

.header-container {
  display: flex;
  align-items: center;
}

.header-logo {
  cursor: pointer;
}

.menu-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: var(--app-bg-color);
  color: var(--primary-color-rgb);
  filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.10));
  cursor: pointer;
}

</style>

<template>
  <div class="app-layout-header header-container">

    <h1 class="header-logo" v-on:click="goHome()">
      Nhl Playoffs report
    </h1>

    <!--    <div class="menu-button" v-on:click="goToMenu()">-->
    <!--      <IconBars w="18" h="18"/>-->
    <!--    </div>-->
  </div>
</template>