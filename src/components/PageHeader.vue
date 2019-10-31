<template>
  <div class="container">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumb"
          :key="index"
          :to="{ path: item.path }"
          >{{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <slot name="header"></slot>
    </div>
    <div class="body">
      <div class="body-content">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import VHeader from "@/components/common/AutoRequireCommonComponents/VHeader";

export default {
  name: "PageHeader",
  data() {
    return {};
  },
  props: {
    breadcrumb: {
      type: Array,
      required: true
    }
  },
  component: {
    VHeader
  }
};
</script>

<style scoped lang="scss">
.container {
  margin-top: 64px;
  height: 100%;
  .breadcrumb {
    padding: 16px 32px 0;
  }
  .search {
    padding: 16px 32px 14px 32px;
    .search-title {
      font-size: $title-font-size;
      font-weight: 500;
      color: $title-color;
    }
  }
  .body {
    padding: 24px;
    background-color: $page-body-container-bg;
    height: 100%;
    .body-content {
      background-color: $page-body-content-bg;
      padding: 24px 32px;
    }
  }
}
</style>
