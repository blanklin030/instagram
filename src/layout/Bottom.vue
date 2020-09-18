<template>
  <mt-tabbar 
    v-if="isShow"
    @click.native="handleClick" 
    :fixed="true" 
    class="app-bottom" 
    v-model="selected"
  >
    <mt-tab-item id="index">
      <img 
        slot="icon" 
        :src="require('@/assets/images/layout/sy'+(selected=='index'?'-focus':'')+'.png')" 
      />
      首页
    </mt-tab-item>
    <mt-tab-item id="order">
      <img 
        slot="icon" 
        :src="require('@/assets/images/layout/dd'+(selected=='order'?'-focus':'')+'.png')" 
      />
      订单
    </mt-tab-item>
    <mt-tab-item id="discover">
      <img 
        slot="icon" 
        :src="require('@/assets/images/layout/fx'+(selected=='discover'?'-focus':'')+'.png')" 
      />
      发现
    </mt-tab-item>
    <mt-tab-item id="mine">
      <img 
        slot="icon" 
        :src="require('@/assets/images/layout/wd'+(selected=='mine'?'-focus':'')+'.png')" 
      />
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
import { mapGetters } from 'vuex';
import Vue from 'vue'
import { Tabbar, TabItem } from 'mint-ui';
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
export default {
  name: 'app-bottom',
  data() {
    return {
      selected: 'index'
    }
  },
  mounted() {
    this.selected = this.$route.path.split('/')[1]
    console.log(this.selected)
  },
  methods: {
    handleClick() {
      window.location.href = '/#/' + this.selected
    }
  },
  computed: {
    ...mapGetters(['bottom']),
    isShow() {
      return this.bottom.show;
    },
  },
}
</script>

<style lang="scss" scoped>
.app-bottom {
  bottom: 0px;
  left: 0px;
}
</style>