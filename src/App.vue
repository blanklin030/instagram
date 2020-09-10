<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import '@/assets/styles/base.scss';
export default {
  name: 'App',
};
</script>
<style lang="scss">
body
#app {
  height: 100vh;
  width: 100vw;
}
</style>
