<template>
  <div class="container">
    <img :src="img.logo" alt="洋蔥數學logo" class="logo" />
    <div class="show">
      <div>{{ username }}</div>
      <button class="quit" @click="quit">退出</button>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/logo/nav_logo.png";
import { mapState } from "vuex";
export default {
  name: "PageNav",
  data() {
    return {
      img: {
        logo
      }
    };
  },
  computed: {
    ...mapState({
      username: state => state.user.mail
    })
  },
  methods: {
    quit() {
      localStorage.removeItem("token");
      this.$router.replace("/login");
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  position: fixed;
  top: 0;
  right: 0;
  left: 256px;
  height: 64px;
  background-color: $nav-header-bg;
  box-shadow: 0 1px 4px 0 $nav-header-shadow;
  padding: 17px 32px;
  @extend .h--c-v--sb;
  z-index: 10;
  transition: all 0.3s ease;
  .logo {
    display: block;
    width: 122px;
    height: 30px;
  }
  .show {
    @extend .h--c-v--sb;
    font-size: $common-font-size;
    color: $common-font-color;
    .quit {
      margin-left: 15px;
      color: $common-font-color;
      background-color: $white;
    }
  }
}
</style>
