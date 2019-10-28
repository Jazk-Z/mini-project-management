<template>
  <div class="nav-item-container" :key="index" @click="chengeTag">
    <div class="nav-item-left">
      <i class="icon" :style="{ backgroundImage: `url(${nav.icon})` }"></i>
      <span>{{ nav.name }}</span>
    </div>
    <div :class="['nav-item-right', { 'nav-item-right-rotate': iconRotate }]">
      <i></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "SideItemNav",
  data() {
    return {};
  },
  methods: {
    chengeTag() {}
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.nav-item-container {
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  &:hover {
    background-color: rgb(67, 74, 80);
  }
  .nav-item-left {
    display: flex;
    align-items: center;
  }
  .nav-item-right {
    width: 12px;
    height: 12px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url("../../assets/arrow_down.svg");
    transition: all 0.3s ease;
  }
  .nav-item-right-rotate {
    transform: rotate(180deg);
  }
}
</style>
