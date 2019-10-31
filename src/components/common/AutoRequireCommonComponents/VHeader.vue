<template>
  <header class="header">
    <h1 class="title">{{ title }}</h1>
    <div class="search-block" :class="{ showMaxWidth: showMaxWidth }">
      <el-autocomplete
        class="inline-input"
        v-model="searchValue"
        :fetch-suggestions="querySearch"
        :placeholder="placeholder"
        @select="handleSelect"
        v-show="type === 'search'"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchUserInfo"
        ></el-button>
      </el-autocomplete>
    </div>
  </header>
</template>

<script>
import DBOperation from "config/indexDB";
import { env } from "@/utils";
const count = 10;
const offset = -1;
export default {
  name: "VHeader",
  data() {
    return {
      searchValue: "",
      prevSearchValue: []
    };
  },
  props: {
    DB: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      default: () => {}
    },
    placeholder: {
      type: String,
      default: () => "請輸入搜索條件"
    },
    title: {
      type: String
    },
    showMaxWidth: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    querySearch(queryString, cb) {
      const prevSearchValue = this.prevSearchValue;
      const recorded = prevSearchValue.filter(this.createFilter(queryString));
      const results = queryString ? recorded : prevSearchValue;
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
        );
      };
    },
    async searchUserInfo() {
      try {
        this.$emit("update", this.searchValue);
        const save = this.prevSearchValue.some(
          search => search.value === this.searchValue
        );
        if (save || !this.searchValue) return false;
        const id = await this.db.add({
          value: this.searchValue,
          time: new Date()
        });
        this.prevSearchValue = await this.db.some(count, offset);
        if (id >= 11) {
          await this.db.delete(id - count);
        }
      } catch (e) {
        env && console.warn("查詢失敗：", e);
      }
    },
    handleSelect() {},
    reset() {
      this.searchValue = "";
    }
  },
  async mounted() {
    const opt = {
      name: "SearchRewardRecord",
      isKeyValue: false,
      keyPath: "id",
      autoIncrement: true,
      indexes: [
        {
          name: "id",
          keyPath: "id",
          unique: true
        }
      ],
      ...this.options
    };
    this.db = new DBOperation(this.DB, 1, opt);
    this.prevSearchValue = await this.db.some(10, -1);
  },
  errorCaptured(err, component, info) {
    env && console.warn(`${component} is error, error信息 ${err}:${info}`);
  }
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 24px;
    margin-bottom: 0;
  }
  .showMaxWidth {
    .el-autocomplete {
      width: 300px;
    }
  }
}
</style>
