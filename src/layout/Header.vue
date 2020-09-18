<template>
  <mt-header :title="$route.name" class="app-header">
    <router-link v-if="isShow" :to="back" slot="left">
      <mt-button icon="back" @click="handleClick">返回</mt-button>
    </router-link>
    <mt-button icon="more" slot="right" @click="handleMore"/>
    <mt-popup
      v-model="visible"
      popup-transition="popup-fade"
    >
      退出
    </mt-popup>
  </mt-header>
</template>

<script>
import { mapGetters } from 'vuex';
import Vue from 'vue'
import { Header, Button, Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);
Vue.component(Button.name, Button);
Vue.component(Header.name, Header);

export default {
  name: 'app-header',
  props: {
    back: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      selected: 1,
      visible: false,
    }
  },
  mounted() {
    
  },
  methods: {
    handleClick() {
      if (this.header.back.url.length > 0) {
        window.location.href = this.header.back.url
      }
      window.history.back()
    },
    handleMore() {
      console.log(this.visible);
      this.visible = true
    }
  },
  computed: {
    ...mapGetters(['header']),
    isShow() {
      return this.header.back.show;
    },
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
  z-index: 111;
}
</style>