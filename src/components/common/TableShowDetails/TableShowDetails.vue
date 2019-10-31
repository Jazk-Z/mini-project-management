<template functional>
  <div class="container">
    <div class="content">
      <icons icon-class="table-tips"></icons>
      <div class="during">
        <span class="startCount">第&nbsp;&nbsp;{{ props.startCount }}</span
        >-<span class="endCount">{{ props.endCount }}&nbsp;&nbsp;条,</span
        >&nbsp;&nbsp;
        <div class="total">共&nbsp;&nbsp;{{ props.total }}&nbsp;&nbsp;条</div>
      </div>
    </div>
  </div>
</template>

<script>
import Icons from "../Icons/Icons";
export default {
  name: "TableShowDetails",
  data() {
    return {};
  },
  components: {
    Icons
  }
};
</script>

<style scoped lang="scss">
.container {
  margin-top: 0;
  height: 40px;
  background: $table-tips-background-color;
  border-radius: 4px;
  border: 1px solid $table-tips-border-color;
  padding: 0 16px;
  @extend .h-v-c;
  .content {
    @extend .h-v-c;
    .during {
      @extend .h-v-c;
      .startCount {
        margin-left: 10px;
      }
    }
  }
}
</style>
