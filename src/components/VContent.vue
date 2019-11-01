<template>
  <div class="container">
    <div class="header">
      <ul class="route-block">
        <li v-for="(router, key) in route" :key="key" class="route-detail">
          <router-link to="router.path" v-if="router.path" class="router">{{
            router.name
          }}</router-link>
          <div class="text" v-else>{{ router.name }}</div>
          <div class="interval">
            <img :src="interval" alt="interval" />
          </div>
        </li>
      </ul>
      <div class="title-block">
        <div>{{ title }}</div>
      </div>
    </div>
    <div class="body">
      <div class="body_content">
        <slot name="body"></slot>
      </div>
    </div>
    <div class="tips">Copyright © 2019 钟繇 后台管理系统</div>
  </div>
</template>
<script>
import arrow from "@/assets/ico-right-arrow.svg";
export default {
  name: "VContent",
  data() {
    return {
      interval: null
    };
  },
  props: {
    title: {
      type: String,
      required: true
    },
    route: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.interval = arrow;
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  padding-top: 64px;
  position: relative;
  .header {
    width: 100%;
    padding: 16px 32px;
    .route-block {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.45);
      display: flex;
      .route-detail {
        display: flex;
        .interval {
          width: 14px;
          height: 14px;
          margin: 0 6px;
          img {
            display: block;
            width: 14px;
            height: 14px;
          }
        }
        .router {
          color: rgba(0, 0, 0, 0.65);
          cursor: pointer;
          &:hover {
            color: #409eff;
          }
        }
        &:last-child {
          .interval {
            display: none;
          }
        }
      }
    }
    .title-block {
      margin-top: 16px;
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .body {
    width: 100%;
    padding: 24px;
    background-color: #f0f2f5;
    height: calc(100% - 82px);
    overflow: hidden;
    .body_content {
      background-color: #fff;
      padding: 24px 32px 32px;
    }
  }
  .tips {
    position: absolute;
    bottom: 16px;
    width: 100%;
    left: 0;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
