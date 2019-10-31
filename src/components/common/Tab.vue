<template>
  <div>
    <div
      class="header-tab"
      v-for="(title, index) in subTitles"
      :key="title.number"
      @click="changeTab(index)"
      :class="{ 'current-tab': title.number === currentIndex }"
    >
      <span>{{ title.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: this.currentTab
    };
  },
  props: {
    // 含有標題的數組, 索引爲對象
    subTitles: {
      // Array，index爲對象
      type: Array,
      default: () => [],
      required: false
    },
    // 當前高亮tab的索引值
    currentTab: {
      type: Number,
      default: 0
    }
  },
  methods: {
    // @vuese
    // Used to manually clear the form
    changeTab(index) {
      this.subTitles.forEach((item, n) => {
        if (n === index && this.currentIndex !== index && item.route) {
          this.currentIndex = index;
          // 獲取當前高亮tab的索引
          // @arg index 當前索引值
          this.$emit("changeHead", index);
          this.$router.push(item.route);
        } else if (n === index && this.currentIndex !== index) {
          this.currentIndex = index;
          this.$emit("changeHead", index);
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      console.log(from);
      if (to.path === "/CommodityList") {
        this.currentIndex = 0;
      }
    },
    currentTab(val) {
      this.currentIndex = val;
    }
  }
};
</script>

<style scoped>
.header-tab {
  font-size: 18px;
  color: #ccc;
  line-height: 60px;
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
}
.current-tab {
  color: #578cee;
  line-height: 55px;
  border-bottom: 5px solid;
}
.header-tab:first-child ~ div {
  margin-left: 50px;
}
</style>
