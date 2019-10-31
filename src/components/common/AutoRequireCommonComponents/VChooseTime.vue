<template>
  <div class="conditions minHeight">
    <span class="conditions-name">時間段: </span>
    <el-radio-group v-model="getProxyTime">
      <el-radio label="all">全部</el-radio>
      <el-radio label="week">一週內</el-radio>
      <el-radio label="month">本月</el-radio>
      <el-radio label="threeMonth">近三個月</el-radio>
      <el-radio label="halfYear">半年內</el-radio>
      <el-radio label="year">一年內</el-radio>
      <el-radio label="custom">自定義時間</el-radio>
    </el-radio-group>
    <div class="pick-block">
      <el-date-picker
        v-show="picker"
        v-model="customTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="開始日期"
        end-placeholder="結束日期"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script>
import { env } from "@/utils";
const createTimeProxy = {
  all: "all", // 後端中間件問題
  week: 7,
  month: 30,
  threeMonth: 90,
  halfYear: 30 * 6,
  year: 30 * 12
};
export default {
  name: "VChooseTime",
  data() {
    return {
      getProxyTime: "all",
      picker: false,
      customTime: ""
    };
  },
  watch: {
    getProxyTime(chooseTimeDuring) {
      env &&
        console.log(
          `-------------> 選擇的時間是${chooseTimeDuring}：`,
          createTimeProxy[chooseTimeDuring]
        );
      this.picker = chooseTimeDuring === "custom";
      chooseTimeDuring !== "custom" &&
        this.$emit("choose-time-array", createTimeProxy[chooseTimeDuring]);
    },
    customTime(chooseTime) {
      env && console.log(`-------------> 選擇的時間是custom：`, chooseTime);
      this.$emit("choose-time-array", chooseTime);
    }
  },
  methods: {
    reset() {
      this.getProxyTime = "all";
    }
  }
};
</script>

<style scoped lang="scss">
.conditions {
  margin-top: -20px;
  .conditions-name {
    margin-right: 20px;
  }
  .pick-block {
    margin-left: 10px;
  }
}
.minHeight {
  display: flex;
  align-items: center;
  height: 66px;
}
</style>
