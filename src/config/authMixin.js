import { mapState } from "vuex";
import { MessageBox } from "element-ui";
import { env } from "@/utils";
const authMixin = {
  computed: {
    ...mapState({
      action: state => state.user.actions
    })
  },
  mounted() {
    this.$on("permission-to-check", (modules, permission, argument, fn) => {
      if (~this.action.indexOf(`${modules}-${permission}`) !== 0) {
        env &&
          console.log(
            `-----------> 模块：${modules}:权限${permission} 校验成功`
          );
        this.$emit("success", argument);
        fn && fn();
      } else {
        this.$emit("failure");
        MessageBox.confirm("您没有该权限,请联系相关人员增加该权限", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          center: true
        })
          .then()
          .catch(() => {});
      }
    });
  }
};
export default authMixin;
