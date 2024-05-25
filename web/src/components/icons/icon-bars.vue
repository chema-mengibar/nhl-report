<template>
  <svg xmlns="http://www.w3.org/2000/svg" 
    :class="$options.name"
    :width="w" 
    :height="h" 
    :viewBox="`0 0 16 14`" 
  >

<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
  <path :fill="c" d="M0.125 1.625C0.125 1.02734 0.617188 0.5 1.25 0.5H14.75C15.3477 0.5 15.875 1.02734 15.875 1.625C15.875 2.25781 15.3477 2.75 14.75 2.75H1.25C0.617188 2.75 0.125 2.25781 0.125 1.625ZM0.125 7.25C0.125 6.65234 0.617188 6.125 1.25 6.125H14.75C15.3477 6.125 15.875 6.65234 15.875 7.25C15.875 7.88281 15.3477 8.375 14.75 8.375H1.25C0.617188 8.375 0.125 7.88281 0.125 7.25ZM14.75 14H1.25C0.617188 14 0.125 13.5078 0.125 12.875C0.125 12.2773 0.617188 11.75 1.25 11.75H14.75C15.3477 11.75 15.875 12.2773 15.875 12.875C15.875 13.5078 15.3477 14 14.75 14Z" />


  </svg>
</template>
<script>
export default {
  name: 'Bars',
  props: {
    w: { type: [Number, String], default: 16 },
    h: {type: [Number, String], default: 14 },
    c: {type: String, default: 'currentColor'}
  }
}
</script>