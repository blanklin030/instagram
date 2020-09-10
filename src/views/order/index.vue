<template>
  <div class="order">
    <h1>order</h1>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  name: 'order',
  components: {
    
  }
}
</script>

<style lang="scss" scoped>
.order {
  
}
</style>
