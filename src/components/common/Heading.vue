<template>
  <div class="flex flex-align-center header">
    <div class="title-name">{{ title }}</div>
    <Tab
      :subTitles="subTitles"
      :currentTab="headIndex"
      @changeHead="getTitle"
    ></Tab>
    <div class="flex-1">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Tab from "./Tab";
export default {
  data() {
    return {
      headIndex: this.currentTab
    };
  },
  name: "Heading",
  components: {
    Tab
  },
  props: {
    title: String,
    subTitles: Array,
    currentTab: {
      type: Number,
      default: 0
    }
  },
  methods: {
    getTitle(number) {
      this.headIndex = number;
    }
  },
  watch: {
    headIndex(val) {
      console.log(val + "heading");
      this.$emit("changeTab", val);
    },
    currentTab(val) {
      this.headIndex = val;
    }
  }
};
</script>

<style scoped>
.header {
  height: 60px;
  padding-left: 25px;
  padding-right: 25px;
  background-color: #f5f7f8;
  border-bottom: 1px solid #e0e0e0;
}
.header > .title-name {
  margin-right: 50px;
  font-size: 24px;
  color: #000000;
}
</style>
