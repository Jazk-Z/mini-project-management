<script>
import authMixin from "config/authMixin";
export default {
  name: "VAccessButton",
  mixins: [authMixin],
  data() {
    return {};
  },
  props: {
    // 所屬的module
    modules: {
      type: String,
      required: true
    },
    // 所在的權限名稱
    permission: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: () => ""
    },
    argument: {
      type: [Object, String]
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  render: function(h) {
    return h(
      "el-button",
      {
        on: {
          click: e => {
            e.stopPropagation();
            console.log(this);
            this.$emit(
              "permission-to-check",
              this.modules,
              this.permission,
              this.argument
            );
          }
        },
        props: {
          type: this.type,
          disabled: this.disabled
        }
      },
      [this.text]
    );
  }
};
</script>

<style scoped></style>
