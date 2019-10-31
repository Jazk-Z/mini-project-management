<script>
import _ from "lodash";
import SelectCondition from "./SelectCondition";
import { env } from "@/utils";

export default {
  name: "FilterTableCondition",
  data() {
    return {
      hidden: false
    };
  },
  props: {
    filterTableCondition: {
      type: Array,
      required: true
    }
  },
  components: {
    SelectCondition
  },
  methods: {
    open() {
      this.hidden = !this.hidden;
    },
    selectMethods(parameter, value) {
      env &&
        console.log(
          `---------> select    parameter: ${parameter}    value: ${value}`
        );
      this.$emit("select-item", parameter, value);
    }
  },
  render: function(h) {
    const result = _.chain(this.filterTableCondition)
      .map((condition, index) => {
        let render = [];
        if (condition.type === "select") {
          const select = h("SelectCondition", {
            props: {
              option: condition?.option,
              defaultValue: condition?.defaultValue
            },
            on: {
              "select-item": data =>
                this.selectMethods(condition.parameter, data)
            }
          });
          const label = h("label", {}, condition.title);
          const selectItem = h(
            "div",
            {
              class: {
                "form-item": true
              }
            },
            [label, select]
          );
          render.push(selectItem);
        }
        return h(
          "el-col",
          {
            style: {
              display: index > 1 ? (this.hidden ? "" : "none") : ""
            },
            props: {
              span: 8
            }
          },
          render
        );
      })
      .value();
    const openTextBlock = h(
      "div",
      {
        class: {
          "condition-open-block": true
        },
        on: {
          click: this.open
        }
      },
      [
        h(
          "span",
          {
            class: {
              "condition-open-block-text": true
            }
          },
          this.hidden ? "关闭" : "展开"
        ),
        h("i", {
          class: {
            "el-icon-arrow-down": true,
            "el-icon-arrow-down-transition-open": this.hidden,
            "el-icon-arrow-down-transition-close": !this.hidden
          }
        })
      ]
    );
    const showOpenTextBlock =
      this.filterTableCondition.length > 2 ? openTextBlock : null;
    const ButtonBlock = h(
      "div",
      {
        class: {
          "condition-button-block": true
        }
      },
      [this.$slots.buttonSlot, showOpenTextBlock]
    );
    const ButtonSlot = h(
      "el-col",
      {
        props: {
          span: 8
        }
      },
      [ButtonBlock]
    );
    result.push(ButtonSlot);
    const PositionItem = h(
      "div",
      {
        class: {
          "position-item": this.filterTableCondition.length > 1,
          "position-item-change": !(this.filterTableCondition.length > 1),
          "position-item-change-no": this.filterTableCondition.length === 0
        }
      },
      result
    );
    return h(
      "form",
      {
        attrs: {
          autoComplete: "off"
        }
      },
      [PositionItem]
    );
  }
};
</script>

<style scoped lang="scss">
.form-item {
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin-bottom: 20px;
  &:nth-child(1) {
    padding-left: 0;
  }
}
.position-item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.position-item-change {
  display: flex;
  justify-content: space-between;
}
.position-item-change-no {
  display: flex;
  justify-content: flex-end;
}
.condition-button-block {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;
}
.condition-open-block {
  margin-left: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.condition-open-block-text {
  font-size: $common-font-size;
  color: $filter-condition-color;
}
.el-icon-arrow-down-transition-open {
  transform: rotate3d(0, 0, 1, 180deg);
}
.el-icon-arrow-down-transition-close {
  transform: rotate3d(0, 0, 1, 0deg);
}
</style>
