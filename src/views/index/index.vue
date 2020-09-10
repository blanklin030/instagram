<template>
  <div class="index">
    <mt-swipe class="swipe" :auto="4000">
      <mt-swipe-item>
        <img src="@/assets/images/index/gw.png" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="@/assets/images/index/jl.png" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="@/assets/images/index/td.png" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="@/assets/images/index/wt.png" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="@/assets/images/index/zl.png" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  name: 'index',
  components: {
    
  }
}
</script>

<style lang="scss" scoped>
.index {
  .swipe {
    height: 10rem;
  }
}
</style>
