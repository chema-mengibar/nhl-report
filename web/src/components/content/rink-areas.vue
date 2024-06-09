<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :class="$options.name + ' rink-areas'"
       :width="w"
       :height="h"
       :viewBox="`0 0 263 259`"
       :id="id"
        transform="rotate(0 0 0 )"
  >


    <g class="base">
      <path d="M3.297 0H261.234V200.358C261.234 231.838 235.714 257.358 204.234 257.358H60.297C28.8168 257.358 3.297 231.838 3.297 200.358V0Z" />
    </g>

    <g class="areas">
      <rect data-area="right_point" class="" x="3.94971" y="88.749" width="101.625" height="17.7451" :fill="areas.rightpoint || 'var(--rink-area-bg-default)'" />
      <rect data-area="low_right_point"  x="3.94971" y="107.494" width="101.625" height="17.7451" :fill="areas.lowrightpoint || 'var(--rink-area-bg-default)'" />
      <rect data-area="inside_right_circle"  x="68.3103" y="126.239" width="37.2644" height="37.0767" :fill="areas.insiderightcircle || 'var(--rink-area-bg-default)'" />
      <path data-area="right_slot"  d="M105.575 221.35L68.7278 164.23H105.575V221.35Z" :fill="areas.rightslot || 'var(--rink-area-bg-default)'" />
      <path data-area="left_slot"  d="M158.95 221.376L195.526 164.23H158.677L158.95 221.376Z" :fill="areas.leftslot || 'var(--rink-area-bg-default)'" />
      <rect data-area="outside_right_circle"  x="3.94971" y="126.239" width="63.3606" height="37.0767" :fill="areas.outsiderightcircle || 'var(--rink-area-bg-default)'" />
      <path data-area="low_right"  d="M3.94971 164.316H67.538L105.145 222.539L9.13431 222.416L5.90169 213.952L3.94971 205.2L3.94971 164.316Z" :fill="areas.lowright || 'var(--rink-area-bg-default)'" />
      <rect data-area="inside_left_circle"  x="-0.5" y="0.5" width="37.2644" height="37.0767" transform="matrix(-1 0 0 1 195.439 125.739)" :fill="areas.insideleftcircle || 'var(--rink-area-bg-default)'" />
      <rect data-area="outside_left_circle"  x="-0.5" y="0.5" width="63.3606" height="37.0767" transform="matrix(-1 0 0 1 259.8 125.739)" :fill="areas.outsideleftcircle || 'var(--rink-area-bg-default)'" />
      <path data-area="low_left"  d="M260.3 164.316H196.713L159.357 222.554L255.115 222.416L258.348 213.952L260.3 205.2L260.3 164.316Z" :fill="areas.lowleft || 'var(--rink-area-bg-default)'" />
      <rect data-area="left_point"  x="158.956" y="88.749" width="101.625" height="17.7451" :fill="areas.leftpoint || 'var(--rink-area-bg-default)'" />
      <rect data-area="low_left_point"  x="158.55" y="107.494" width="101.858" height="17.7451" :fill="areas.lowleftpoint || 'var(--rink-area-bg-default)'"/>
      <rect data-area="center_point"  x="106.575" y="88.749" width="51.3817" height="17.7451" :fill="areas.centerpoint || 'var(--rink-area-bg-default)'" />
      <rect data-area="neutralzone"  x="3.94971" y="0.5" width="256.632" height="87.249" :fill="areas.neutralzone || 'var(--rink-area-bg-default)'"/>
      <rect data-area="low_cp"  x="106.575" y="107.494" width="51.3817" height="17.7451" :fill="areas.lowcp || 'var(--rink-area-bg-default)'"/>
      <rect data-area="slot"  x="106.575" y="164.23" width="51.3817" height="28.7114" :fill="areas.slot || 'var(--rink-area-bg-default)'"/>
      <rect data-area="high_slot"  x="106.575" y="126.239" width="51.3817" height="37.0767" :fill="areas.highslot || 'var(--rink-area-bg-default)'"/>
      <rect data-area="lows_lot"  x="106.575" y="194.027" width="51.3817" height="28.5206" :fill="areas.lowslot || 'var(--rink-area-bg-default)'" />
      <path data-area="downlow"  :fill="areas.downlow || 'var(--rink-area-bg-default)'" d="M16.8915 236.115L9.76576 223.548H254.777L247.845 236.119L237.37 245.682L224.401 252.805L208.321 256.858H132.265H70.5865H57.0459L40.7555 252.804L27.5761 245.68L16.8915 236.115Z" />
    </g>
    
    <g :style="{display:'none'}">
      <text class="area-label" v-if="values.rightpoint" data-area="right_point" x="50" y="100" dominant-baseline="middle" text-anchor="middle">{{ values.rightpoint }}</text>
      <text class="area-label" v-if="values.lowrightpoint" data-area="lowrightpoint" x="3.94971" y="107.494" dominant-baseline="middle" text-anchor="middle">{{ values.lowrightpoint }}</text>
      <text class="area-label" v-if="values.insiderightcircle" data-area="inside_right_circle" x="68.3103" y="126.239" dominant-baseline="middle" text-anchor="middle">{{ values.insiderightcircle }}</text>
      <text class="area-label" v-if="values.rightslot" data-area="right_slot" x="0" y="0" dominant-baseline="middle" text-anchor="middle">{{ values.rightslot }}</text>
      <text class="area-label" v-if="values.leftslot" data-area="left_slot" x="0" y="0" dominant-baseline="middle" text-anchor="middle">{{ values.leftslot }}</text>
      <text class="area-label" v-if="values.outsiderightcircle" data-area="outside_right_circle" x="3.94971" y="126.239"  dominant-baseline="middle" text-anchor="middle">{{ values.outsiderightcircle }}</text>
      <text class="area-label" v-if="values.lowright" data-area="low_right" x="39" y="145" dominant-baseline="middle" text-anchor="middle">{{ values.lowright }}</text>
      <text class="area-label" v-if="values.insideleftcircle" data-area="inside_left_circle"  x="-0.5" y="0.5" dominant-baseline="middle" text-anchor="middle">{{ values.insideleftcircle }}</text>
      <text class="area-label" v-if="values.outsideleftcircle" data-area="outside_left_circle" x="-0.5" y="0.5" dominant-baseline="middle" text-anchor="middle">{{ values.outsideleftcircle }}</text>
      <text class="area-label" v-if="values.lowleft" data-area="low_left" x="0" y="0" dominant-baseline="middle" text-anchor="middle">{{ values.lowleft }}</text>
      <text class="area-label" v-if="values.leftpoint" data-area="left_point"  x="158.956" y="88.749" dominant-baseline="middle" text-anchor="middle">{{ values.leftpoint }}</text>
      <text class="area-label" v-if="values.lowleftpoint" data-area="low_left_point" x="158.55" y="107.494" dominant-baseline="middle" text-anchor="middle">{{ values.lowleftpoint }}</text>
      <text class="area-label" v-if="values.centerpoint" data-area="center_point" x="106.575" y="88.749" dominant-baseline="middle" text-anchor="middle">{{ values.centerpoint }}</text>
      <text class="area-label" v-if="values.neutralzone" data-area="neutralzone" x="3.94971" y="0.5" dominant-baseline="middle" text-anchor="middle">{{ values.neutralzone }}</text>
      <text class="area-label" v-if="values.lowcp" data-area="low_cp" x="106.575" y="107.494" dominant-baseline="middle" text-anchor="middle">{{ values.lowcp }}</text>
      <text class="area-label" v-if="values.slot" data-area="slot" x="106.575" y="164.23"  dominant-baseline="middle" text-anchor="middle">{{ values.slot }}</text>
      <text class="area-label" v-if="values.highslot" data-area="high_slot" x="106.575" y="126.239" dominant-baseline="middle" text-anchor="middle">{{ values.highslot }}</text>
      <text class="area-label" v-if="values.lowslot" data-area="lows_lot" x="106.575" y="194.027" dominant-baseline="middle" text-anchor="middle">{{ values.lowslot }}</text>
      <text class="area-label" v-if="values.downlow" data-area="downlow" x="0" y="0" dominant-baseline="middle" text-anchor="middle">{{ values.downlow }}</text>
    </g>
    
    <g class="lines">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M67.8103 200.638C87.9124 200.638 104.208 184.342 104.208 164.24C104.208 144.138 87.9124 127.842 67.8103 127.842C47.7083 127.842 31.4124 144.138 31.4124 164.24C31.4124 184.342 47.7083 200.638 67.8103 200.638ZM67.8103 201.638C88.4647 201.638 105.208 184.895 105.208 164.24C105.208 143.586 88.4647 126.842 67.8103 126.842C47.156 126.842 30.4124 143.586 30.4124 164.24C30.4124 184.895 47.156 201.638 67.8103 201.638Z" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M195.98 200.638C216.082 200.638 232.378 184.342 232.378 164.24C232.378 144.138 216.082 127.842 195.98 127.842C175.878 127.842 159.582 144.138 159.582 164.24C159.582 184.342 175.878 200.638 195.98 200.638ZM195.98 201.638C216.634 201.638 233.378 184.895 233.378 164.24C233.378 143.586 216.634 126.842 195.98 126.842C175.326 126.842 158.582 143.586 158.582 164.24C158.582 184.895 175.326 201.638 195.98 201.638Z" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M147.23 222.971C146.989 219.359 145.447 215.942 142.871 213.366C140.058 210.554 136.243 208.974 132.266 208.974C128.288 208.974 124.473 210.554 121.661 213.366C119.085 215.942 117.542 219.359 117.301 222.971L147.23 222.971ZM148.232 222.971C147.989 219.093 146.341 215.423 143.578 212.659C140.578 209.659 136.508 207.974 132.266 207.974C128.023 207.974 123.954 209.659 120.953 212.659C118.19 215.423 116.542 219.093 116.299 222.971C116.278 223.303 116.268 223.637 116.268 223.971L148.263 223.971C148.263 223.637 148.253 223.303 148.232 222.971Z" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M255.381 224.353H9.16895V223.353H255.381V224.353Z" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M260.5 88.7528L4.05066 88.7528L4.05066 87.7528L260.5 87.7528L260.5 88.7528Z" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M260.234 1H4.297V200.358C4.297 231.286 29.3691 256.358 60.297 256.358H204.234C235.162 256.358 260.234 231.286 260.234 200.358V1ZM3.297 0V200.358C3.297 231.838 28.8168 257.358 60.297 257.358H204.234C235.714 257.358 261.234 231.838 261.234 200.358V0H3.297Z" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M94.764 1C95.0194 10.587 98.9392 19.7277 105.739 26.527C112.774 33.5624 122.316 37.5149 132.266 37.5149C142.215 37.5149 151.757 33.5625 158.793 26.527C165.592 19.7277 169.512 10.5871 169.767 1.00001L94.764 1ZM93.7637 1C94.0193 10.8523 98.0446 20.2472 105.031 27.2341C112.254 34.4571 122.051 38.5149 132.266 38.5149C142.48 38.5149 152.277 34.4571 159.5 27.2341C166.487 20.2472 170.512 10.8523 170.768 1.00001C170.776 0.667175 170.781 0.333817 170.781 1.14441e-05L93.7507 0C93.7507 0.333805 93.7551 0.667164 93.7637 1Z" />
    </g>


  </svg>
</template>
<script>
export default {
  name: 'RinkAreas',
  props: {
    w: { type: [Number, String], default: 263 },
    h: {type: [Number, String], default: 259 },
    c: {type: String, default: 'currentColor'},
    id: {type: String, default: 'svg'},
    areas:{  type: [ Object], default: {} },
    values:{  type: [ Object], default: {}, required: false }
  }
}
</script>