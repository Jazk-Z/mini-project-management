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
export default {
  name: "PageNav",
  data() {
    return {
      img: {
        logo
      },
      username: "忠有"
    };
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
.h--c-v--sb {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  position: fixed;
  top: 0;
  right: 0;
  left: 256px;
  height: 64px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
  padding: 17px 32px;
  @extend .h--c-v--sb;
  z-index: 10;
  transition: all 0.3s ease;
  .logo {
    display: block;
    width: 200px;
  }
  .show {
    @extend .h--c-v--sb;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    cursor: pointer;
    .quit {
      margin-left: 15px;
      color: rgba(0, 0, 0, 0.65);
      background-color: #fff;
      outline: none;
      border: none;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
