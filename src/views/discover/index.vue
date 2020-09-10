<template>
  <div class="discover">
    <h1>discover</h1>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  name: 'discover',
  components: {
    
  }
}
</script>

<style lang="scss" scoped>
.discover {
  
}
</style>
