<script>
import IconBase from './icons/icon-more.vue'

export default {
  inject: ['$services'],
  name: 'Footer',
  data: ()=>( {
    t: {}
  }),
  created(){
    this.t = this.$services.localeService.D()
  },
  methods: {
    dummy: function(){
      const _ = this ;
    },
    
  },
  components: {
    IconBase,
  },
}
</script>

<style lang="scss">

@import '../styles/media';

.footer{
  
  width: 100%;
  min-height: 200px;
  // background-color: var(--widget-bg-base);
  border-top: 1px solid var(--grey-z_rgb);
  display: flex;
  gap: 14px;
  flex-direction: column;

  @include desktop {
    flex-direction: row;
  }
  
  .footer-col{
    font-size: 18px;
    line-height: 22px;
    background-color: var(--grey-z_rgb);
    color: var(--app-bg-color);
    padding: 20px;
    font-family: var(--font-hl);
    flex:1;
      

    @include desktop {
      &.compact{
        max-width: 33%;
      }
    }


    p{
      font-family: var(--font-copy);
      font-size: 12px;
    }
  }
  
  
}


</style>

<template>
<div class="app-layout-footer footer" :data-cy="$options.name">
  
  <div class="footer-col compact">
    Do you like this project? <br>
    Say hello! <br><br>
    >> <a href="mailto:hello@motuo.info?subject=Motuo nhl-report">hello@motuo.info</a>
  </div>
  <div class="footer-col">
    <p>
      The data are extracted from the <a href="https://developer.sportradar.com/ice-hockey/reference/nhl-overview" target="_blank">sport-radar api</a>
      and further processed for visualization on the web.
      <br/>
      The logos have been extracted from the web site <a href="https://freebiesupply.com" target="_blank"> freebiesupply </a> and are protected by Copyright Policy.
    </p>
  </div>
  

  
</div>
  
</template>