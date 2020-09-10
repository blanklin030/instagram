<template>
  <div class="app-content">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </div>
</template>
<script>
export default {
  name: 'app-content',
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>
<style lang="scss">
.app-content {
  margin-top: 50px;
  margin-bottom: 50px;
  // position: fixed;
  // padding: 20px;
  min-height: calc(100vh - 0px);
  overflow: hidden;
}
</style>
