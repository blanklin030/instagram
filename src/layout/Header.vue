<template>
  <mt-header :title="$route.name" class="app-header">
    <router-link v-if="back.length>0" :to="back" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
    <mt-button icon="more" slot="right"></mt-button>
  </mt-header>
</template>

<script>
import Vue from 'vue'
import { Header } from 'mint-ui';
import { Button } from 'mint-ui';
Vue.component(Button.name, Button);
Vue.component(Header.name, Header);

export default {
  name: 'app-header',
  props: {
    title: {
      type: String,
      default: ''
    },
    back: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      selected: 1
    }
  },
  mounted() {
    
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  width: 100vw;
}
</style>