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
  width: 240px;
}
.left-silde-container {
  width: 240px;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: rgb(84, 92, 100);
  color: #fff;
  .nav-title {
    width: 240px;
    text-align: center;
    height: 60px;
    line-height: 60px;
    background-color: #3a363e;
    font-size: 26px;
    border-bottom: 1px solid slategrey;
  }
  .nav-item-container {
    cursor: pointer;
    height: auto;
    transition: height 3s ease;
    .nav-item-content {
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

    .list-container {
      transition: all 0.3s ease;
      overflow: hidden;
      .list {
        width: 100%;
        padding: 0 45px 0 40px;
        height: 50px;
        line-height: 50px;
        background-color: rgb(75, 82, 90);
        &:hover {
          background-color: rgb(67, 74, 80);
        }
      }
      .list-active {
        background-color: rgb(67, 74, 80);
      }
    }
  }
}
.null {
  width: 240px;
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
