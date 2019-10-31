<script>
import _ from "lodash";
export default {
  name: "SelectCondition",
  data() {
    return {
      selectValue: this.defaultValue
    };
  },
  methods: {
    select(selectValue) {
      this.selectValue = selectValue.label;
      this.$emit("select-item", selectValue);
    }
  },
  props: {
    option: {
      type: Array,
      required: true
    },
    defaultValue: {
      type: String
    }
  },
  render: function(h) {
    return h(
      "div",
      {
        class: {
          "select-width": true
        }
      },
      [
        h(
          "el-select",
          {
            on: {
              change: this.select
            },
            props: {
              value: this.selectValue
            }
          },
          _.map(this.option, option => {
            return h(
              "el-option",
              {
                props: {
                  value: option
                }
              },
              option.label
            );
          })
        )
      ]
    );
  }
};
</script>

<style lang="scss">
.select-width {
  flex: 1;
  display: inline-block;
  .el-select {
    width: 100%;
    .el-input {
      width: 100%;
    }
  }
}
</style>
