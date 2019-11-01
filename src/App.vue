<template>
  <div id="app">
    <LeftSideNav></LeftSideNav>
    <div class="right-view">
      <PageNav></PageNav>
      <router-view />
    </div>
  </div>
</template>
<script>
import LeftSideNav from "@/components/LeftSideNav/LeftSideNav";
import PageNav from "@/components/PageNav";
export default {
  name: "app",
  mounted() {},
  components: {
    LeftSideNav,
    PageNav
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
