<template>
  <div id="app">
    <LeftSideNav></LeftSideNav>
    <div class="right-view">
      <router-view />
    </div>
  </div>
</template>
<script>
import LeftSideNav from "@/components/LeftSideNav/LeftSideNav";
export default {
  name: "app",
  mounted() {},
  components: {
    LeftSideNav
  }
};
</script>
<style lang="scss">
#app {
  width: 100vw;
  display: flex;
  .right-view {
    flex: 1;
  }
}
</style>
