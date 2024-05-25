<template>
  <svg xmlns="http://www.w3.org/2000/svg" 
    :class="$options.name"
    :width="w" 
    :height="h" 
    :viewBox="`0 0 16 16`" 
  >


  <path :fill="c" d="" />


  </svg>
</template>
<script>
export default {
  name: 'Dummy',
  props: {
    w: { type: [Number, String], default: 16 },
    h: {type: [Number, String], default: 16 },
    c: {type: String, default: 'currentColor'}
  }
}
</script>