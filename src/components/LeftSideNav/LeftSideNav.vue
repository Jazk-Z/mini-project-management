<template>
  <div class="container">
    <div class="left-silde-container">
      <div class="nav-title">管理后台</div>
      <template v-for="(nav, index) in routerConfigData">
        <div class="nav-item-container" :key="index" @click="chengeTag(index)">
          <div class="nav-item-content">
            <div class="nav-item-left">
              <i
                class="icon"
                :style="{ backgroundImage: `url(${nav.icon})` }"
              ></i>
              <span>{{ nav.title }}</span>
            </div>
            <div
              :class="[
                'nav-item-right',
                { 'nav-item-right-rotate': iconRotateIndex === index }
              ]"
            >
              <i></i>
            </div>
          </div>
          <ul
            v-if="nav.childern"
            class="list-container"
            :style="{
              height:
                nav.childern.length * 50 * !!(iconRotateIndex === index) + 'px'
            }"
          >
            <li
              :class="[
                'list',
                {
                  'list-active':
                    iconRotateIndex === index && isChoosedIndex === key
                }
              ]"
              v-for="(label, key) in nav.childern"
              :key="key"
              @click.stop="chooseRouter(key, label)"
            >
              {{ label.name }}
            </li>
          </ul>
        </div>
      </template>
    </div>
    <div class="null"></div>
  </div>
</template>
<script>
import routerConfig from "@/config/router.config";
export default {
  name: "LeftSideNav",
  data() {
    return {
      routerConfigData: [],
      iconRotateIndex: null,
      isChoosedIndex: null
    };
  },
  methods: {
    chengeTag(index) {
      if (this.iconRotateIndex === index) {
        this.iconRotateIndex = null;
        this.isChoosedIndex = null;
      } else {
        this.iconRotateIndex = index;
        this.chooseRouter(0, this.routerConfigData[index].childern[0]);
      }
    },
    chooseRouter(index, { path }) {
      this.isChoosedIndex = index;
      this.$router.push(path);
    }
  },
  mounted() {
    this.routerConfigData = routerConfig;
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 256px;
}
.left-silde-container {
  width: 256px;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: rgba(0, 21, 41, 1);
  color: #fff;
  box-shadow: 2px 0px 6px 0px rgba(0, 21, 41, 0.35);
  z-index: 3;
  .nav-title {
    width: 256px;
    text-align: center;
    height: 64px;
    line-height: 64px;
    background-color: #002140;
    font-size: 20px;
  }
  .nav-item-container {
    cursor: pointer;
    height: auto;
    transition: height 3s ease;
    margin-top: 8px;
    .nav-item-content {
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      background-color: rgba(0, 21, 41, 1);
      opacity: 0.65;
      &:hover {
        background-color: rgba(24, 144, 255, 1);
        opacity: 1;
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

    .list-container {
      transition: all 0.3s ease;
      overflow: hidden;
      .list {
        width: 100%;
        padding: 0 45px 0 40px;
        height: 50px;
        line-height: 50px;
        background-color: #000d18;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.45);
        opacity: 0.65;
        &:hover {
          background-color: rgba(24, 144, 255, 1);
          opacity: 1;
        }
      }
      .list-active {
        background-color: rgba(24, 144, 255, 1);
        color: #fff;
        opacity: 1;
      }
    }
  }
}
.null {
  width: 256px;
  height: 100%;
}
.icon {
  width: 24px;
  height: 18px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-right: 10px;
}
</style>
