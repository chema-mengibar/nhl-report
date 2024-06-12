<script>
import Logo from "./logo.vue";
import IconBars from "../components/icons/icon-bars.vue";

export default {
  inject: ["$services"],
  name: "Header",
  props: {},
  data: () => ({
    t: {},
    groups: [{ label: "op", value: 1 }],
    model: {
      group: null,
    },
  }),
  created() {
    this.t = this.$services.localeService.D();
  },
  methods: {
    onChangeCallback: function (option) {
      console.log(option.target.value);

      if (option.target.value === "final") {
        this.$router.push({ name: "Final" });
      } else {
        this.$router.push("/" + option.target.value);
      }

      // this.$router.push({
      //   name: "Home",
      //   params: { groupId: option.target.value },
      // });
    },
    goHome: function () {
      this.$router.push({ name: "Home" });
    },
  },
  components: {
    Logo,
    IconBars,
  },
  computed: {},
  mounted() {
    const groupId = this.$route.params.groupId;
    if (groupId) {
      const { found, key } = this.$services.toolService.checkGroupId(groupId);
      if (found) {
        this.model.group = groupId;
      } else {
        this.model.group = null;
      }
    }
  },
};
</script>

<style lang="scss">
@import "../styles/media";

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.header-logo {
  cursor: pointer;
}

.wrapper {
  width: 250px;
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
  filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.1));
  cursor: pointer;
}
</style>

<template>
  <div class="app-layout-header header-container">
    <h1 class="header-logo" v-on:click="goHome()">Nhl Playoffs report</h1>

    <div class="wrapper">
      <select
        class="dropdown"
        v-model="model.group"
        @change="onChangeCallback"
        placeholder="-- Select a serie --"
      >
        <option value="" disabled selected>-- Select a serie --</option>
        <optgroup
          v-for="round in [1, 2, 3]"
          :key="`round-${round}`"
          :label="`Round ${round}`"
        >
          <option
            v-for="group in this.$services.toolService.getRoundGroups(round)"
            :key="group"
            :value="group"
          >
            {{ group }}
          </option>
        </optgroup>
        <optgroup label="Final">
          <option value="final">Oilers-Panthers</option>
        </optgroup>
      </select>
    </div>
    <!--    <div class="menu-button" v-on:click="goToMenu()">-->
    <!--      <IconBars w="18" h="18"/>-->
    <!--    </div>-->
  </div>
</template>