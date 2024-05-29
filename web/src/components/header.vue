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
  z-index: 10;
  background-color: var(--app-bg-color);
  border-bottom: 1px solid rgba(255, 255, 255, 1);
  height: var(--header-height);
  padding: 40px 20px;
  margin-bottom: 20px;
}

.header-logo {
  margin-right: auto;
  cursor: pointer;

  color: var(--text-color-rgb);
  font-family: var(--font-hl);
  font-size:42px;
  align-items: center;
  display:flex;

  .home-logo-icon{
    color: var(--primary-color-rgb);
  }
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
    <div class="header-logo" v-on:click="goHome()">
      Nhl Playoffs report
    </div>

<!--    <div class="menu-button" v-on:click="goToMenu()">-->
<!--      <IconBars w="18" h="18"/>-->
<!--    </div>-->
  </div>
</template>