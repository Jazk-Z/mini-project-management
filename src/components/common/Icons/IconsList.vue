<template>
  <div class="icons-container">
    <div class="icons-wrapper">
      <div
        v-for="item in iconsMap"
        :key="item"
        @click.stop="handleClipboard(generateIconCode(item), $event)"
      >
        <el-tooltip placement="top">
          <div slot="content">
            {{ generateIconCode(item) }}
          </div>
          <div class="icon-item">
            <div>
              <span class="svg-wrap" @click.stop>
                <Icons :icon-class="item" />
              </span>
            </div>
            <span>{{ item }}</span>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import icons from "./generateIconsView";
import clipboard from "./Clipboard";
export default {
  name: "IconsList",
  data() {
    return {
      iconsMap: []
    };
  },
  mounted() {
    console.log(icons);
    const iconsMap = icons.state.iconsMap.map(i => {
      console.log(i);
      return i.default.id
        .split("-")
        .splice(1)
        .join("-");
    });
    this.iconsMap = iconsMap;
  },
  methods: {
    generateIconCode(symbol) {
      return `<Icons icon-class="${symbol}" />`;
    },
    handleClipboard(text, event) {
      clipboard(text, event);
    }
  }
};
</script>

<style lang="scss" scoped>
.icons-container {
  overflow: hidden;
  background-color: #77ffd2;
  .icons-wrapper {
    margin: 0 auto;
    .icon-item {
      margin: 20px;
      height: 110px;
      text-align: center;
      width: 110px;
      float: left;
      font-size: 30px;
      color: #24292e;
      cursor: pointer;
      .svg-wrap {
        cursor: help;
      }
      & > span {
        display: block;
        font-size: 24px;
        margin-top: 10px;
      }
    }
  }
}
</style>
