<template>
  <svg xmlns="http://www.w3.org/2000/svg" 
    :class="$options.name"
    :width="w" 
    :height="h" 
    :viewBox="`0 0 150 151`" 
  >
<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
<path :fill="c" fill-rule="evenodd" clip-rule="evenodd" d="M80.2375 26.8904C80.2375 22.4721 76.6558 18.8904 72.2375 18.8904C67.8192 18.8904 64.2375 22.4721 64.2375 26.8904V67.9802H23.1477C18.7294 67.9802 15.1477 71.5619 15.1477 75.9802C15.1477 80.3985 18.7294 83.9802 23.1477 83.9802H64.2375V125.07C64.2375 129.488 67.8192 133.07 72.2375 133.07C76.6558 133.07 80.2375 129.488 80.2375 125.07V83.9802H121.327C125.746 83.9802 129.327 80.3985 129.327 75.9802C129.327 71.5619 125.746 67.9802 121.327 67.9802H80.2375V26.8904Z" />


  </svg>
</template>
<script>
export default {
  name: 'More',
  props: {
    w: { type: [Number, String], default: 150 },
    h: {type: [Number, String], default: 151 },
    c: {type: String, default: 'currentColor'}
  }
}
</script>