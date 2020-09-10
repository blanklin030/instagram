<template>
  <div class="app-container">
    <v-header ref="vHeader" />
    <v-content ref="vContent" />
    <v-bottom ref="vBottom" />
  </div>
</template>
<script>
import vHeader from './Header';
import vContent from './Content';
import vBottom from './Bottom';

export default {
  name: 'app-layout',
  components: {
    vHeader, vContent, vBottom
  },
};
</script>
<style lang="scss">
.app-container {
  height: 100vh;
  width: 100vw;
}
</style>
