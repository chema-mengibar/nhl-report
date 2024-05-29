<script>


export default {
  inject: ['$services'],
  name: 'HeadlineTeams',
  props: {
    reportId: {type: String, default: null},
  },
  data: () => ({
    t: {},
    teams: []
  }),
  created() {
    this.t = this.$services.localeService.D()
  },
  methods: {
    getReportData: function () {
      const _ = this;
    },
    
  },
  mounted() {
    const report = this.$services.toolService.getData( this.reportId)

    this.teams.push(report.team_a)
    this.teams.push(report.team_b)
    
  },
  components: {},
}
</script>

<style lang="scss">

@import '../../styles/media';


.headline-teams {

  display: inline-flex;
  gap: 14px;

  .team-name {
    display: inline-flex;
    gap: 7px;

    .team-color {
      display: inline-block;
      height: 20px;
      width: 20px;
      border-radius: 10px;
      background-color: white;
    }
  }
}


</style>

<template>
  <div class="headline-teams" :data-cy="$options.name" v-if="teams.length">
    <span class="team-name"> <span class="team-color" :style="{backgroundColor: `var(--color-${teams[0]})`}"></span> {{teams[0]}}   </span>
    <span class="headline-vs">vs</span>
    <span class="team-name"> <span class="team-color" :style="{backgroundColor: `var(--color-${teams[1]})`}"></span>  {{teams[1]}}   </span>
  </div>
</template>