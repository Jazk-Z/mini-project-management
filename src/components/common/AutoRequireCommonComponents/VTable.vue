<script>
import dayjs from "dayjs";
import { env } from "@/utils";
import _ from "lodash";
const layout = ["total", "sizes", "prev", "pager", "next", "jumper"];
const defaultLayout = ["prev", "pager", "next", "jumper"];
export default {
  name: "VTable",
  props: {
    tableData: {
      type: Array,
      required: true
    },
    tableItems: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      required: false
    },
    showPagination: {
      type: Boolean,
      default: () => true
    },
    showAll: {
      type: Boolean,
      default: () => false
    },
    border: {
      type: Boolean,
      default: () => false
    },
    defaultLayout: {
      type: Array,
      default: () => defaultLayout
    }
  },
  render: function(h) {
    let scopedSlots = {};
    const buttonStatue = (status, value, props) => {
      if (!status) return value?.button?.text;
      if (_.isBoolean(props.row[status])) {
        return props.row[status]
          ? value?.button?.textFalse
          : value?.button?.textTrue;
      }
      return props.row[status];
    };
    const button = (item, props) => {
      return item.opt.map(value => {
        return h(
          "el-button",
          {
            on: {
              click: event => {
                event.stopPropagation();
                env && console.log(`---------> `, value.eventName, props);
                this.$emit(value.eventName, props, event);
              }
            },
            props: {
              type: value?.button?.type || "text",
              size: value?.button?.size || "small"
            }
          },
          buttonStatue(value?.button?.status, value, props)
        );
      });
    };
    const clickItem = item => ({
      scopedSlots: {
        default: props => {
          return h(
            "div",
            {
              class: {},
              style: {}
            },
            button(item, props)
          );
        }
      }
    });
    const timeItem = item => ({
      scopedSlots: {
        default: props => {
          return dayjs(props.row[item.prop]).format(item.format);
        }
      }
    });
    /**
     *  {
     *   prop: 'focus',
     *   label: '是否认真看完',
     *   type: 'boolToText',
     *   slot: true,
     *   format: 'focus',
     *   yes: '是',
     *   no: '否',
     *   father: 'extra'
     *  }
     * */
    const boolToText = item => ({
      scopedSlots: {
        default: props => {
          const path =
            !!item.father && _.isString(item.father)
              ? item.father + "." + item.format
              : item.format;
          return _.get(props.row, path, false) ? item.yes : item.no;
        }
      }
    });
    /*
    * {
    * prop: 'status',
      label: '是否看完',
      type: 'kindToText',
      slot: true,
      format: 'status',
      kinds: videoWatchStatus // 枚举
      father: ''
    * }
    * */
    const kindToText = item => ({
      scopedSlots: {
        default: props => {
          const path =
            !!item.father && _.isString(item.father)
              ? item.father + "." + item.format
              : item.format;
          const key = _.get(props.row, path, "");
          return key ? item?.kinds[key] : JSON.stringify(item?.kinds);
        }
      }
    });
    const getObjectValue = item => ({
      scopedSlots: {
        default: props => {
          const result = props.row[item.prop];
          if (Object.prototype.toString.call(result) === "[object Array]") {
            return _.chain(result)
              .reduce((init, value) => {
                init.push(value.name);
                return init;
              }, [])
              .join("-")
              .value();
          }
          if (Object.prototype.toString.call(result) === "[object Object]") {
            return result[item.key];
          }
        }
      }
    });
    // {
    //   prop: 'toprate',
    //   label: '最优正确率',
    //   father: 'extra',
    //   type: 'rate*100',
    //   slot: true
    // }
    const handleRate = item => ({
      scopedSlots: {
        default: props => {
          const path =
            !!item.father && _.isString(item.father)
              ? item.father + "." + item.prop
              : item.prop;
          return _.get(props.row, path, 0) * 100 + "%";
        }
      }
    });
    /**
     * {
     *     prop: 'total',
     *     label: '总时长',
     *     type: 's->min',
     *     slot: true,
     *     father: 'extra'
     * }
     * result: 560 => 3分 四舍五入
     */
    const handleTimeChange = item => ({
      scopedSlots: {
        default: props => {
          const path =
            !!item.father && _.isString(item.father)
              ? item.father + "." + item.prop
              : item.prop;
          return Math.round(_.get(props.row, path, 0) / 60) + "分钟";
        }
      }
    });
    /**
     * {
     *     prop: 'extra.total',
     *     label: '总时长',
     *     type: 's->min.s',
     *     slot: true,
     *     father: 'extra'
     * }
     * result: 560 => 3分12秒
     */
    const handleTimeChangeSaveMinSec = item => ({
      scopedSlots: {
        default: props => {
          const path =
            !!item.father && _.isString(item.father)
              ? item.father + "." + item.prop
              : item.prop;
          return (
            Math.floor(_.get(props.row, path, 0) / 60) +
            "分" +
            Math.floor(_.get(props.row, path, 0) % 60) +
            "秒"
          );
        }
      }
    });
    /**
     * {
     *     prop: 'extra.total',
     *     label: '总时长',
     *     type: 'father',
     *     slot: true,
     *     father: 'extra'
     * }
     */
    const handleFatherField = item => ({
      scopedSlots: {
        default: props => {
          const path =
            !!item.father && _.isString(item.father)
              ? item.father + "." + item.prop
              : item.prop;
          return _.get(props.row, path, "暂无数据");
        }
      }
    });
    // {
    //   prop: 'compose',
    //   label: '当前进度',
    //   composeNum: 2,
    //   join: '/',
    //   data1: 'count',
    //   data2: 'total',
    //   father: 'extra',
    //   slot: true,
    //   type: 'compose'
    // } => 1/2/3/4/5
    const handleComposeField = item => ({
      scopedSlots: {
        default: props => {
          let str = "";
          for (let i = 1; i <= item?.composeNum; i++) {
            const path = `${item.father}.${item[`data${i}`]}`;
            str += _.get(props.row, path, 0) + item?.join;
          }
          return str.slice(0, -1);
        }
      }
    });
    const tableItems = this.tableItems.map(item => {
      // const scopedSlots = item?.slot ? item?.type === 'date' ? timeItem(item) : clickItem(item) : {}
      if (item?.slot) scopedSlots = clickItem(item);
      if (item?.slot && item?.type === "date") scopedSlots = timeItem(item);
      if (item?.slot && item?.type === "boolToText")
        scopedSlots = boolToText(item);
      if (item?.slot && item?.type === "kindToText")
        scopedSlots = kindToText(item);
      if (item?.slot && item?.type === "object")
        scopedSlots = getObjectValue(item);
      if (item?.slot && item?.type === "rate*100")
        scopedSlots = handleRate(item);
      if (item?.slot && item?.type === "s->min")
        scopedSlots = handleTimeChange(item);
      if (item?.slot && item?.type === "s->min.s")
        scopedSlots = handleTimeChangeSaveMinSec(item);
      if (item?.slot && item?.type === "father")
        scopedSlots = handleFatherField(item);
      if (item?.slot && item?.type === "compose")
        scopedSlots = handleComposeField(item);
      if (!item?.slot && !item?.type) scopedSlots = [];
      return h("el-table-column", {
        props: {
          prop: item.prop,
          label: item.label,
          width: item.width,
          showOverflowTooltip: item.showOverflowTooltip,
          type: item.type
        },
        ...scopedSlots
      });
    });
    const paginationLayout = !this.pagination?.layout && this.defaultLayout;
    const currentLayout = paginationLayout.reduce((init, value) => {
      if (~layout.indexOf(value) === 0) return init;
      init.push(value);
      return init;
    }, []);
    const pagination = h("el-pagination", {
      props: {
        layout: currentLayout.join(","),
        currentPage: this.pagination?.currentPage || 1,
        pageSize: this.pagination?.pageSize || 50,
        pageSizes: this.pagination?.pageSizes || [1, 10, 20, 30, 40, 50, 100],
        total: this.pagination?.total,
        "page-count": this.pagination?.pagerCount
      },
      on: {
        "size-change": data => {
          env &&
            console.log("-----------> handle-size-change", `每頁 ${data} 條`);
          this.$emit("handle-size-change", data);
        },
        "current-change": data => {
          env &&
            console.log(
              "-----------> handle-current-change",
              `當前頁: ${data}`
            );
          this.$emit("handle-current-change", data);
        }
      }
    });
    const paginationContainer = h(
      "div",
      {
        class: {
          pagination: true
        },
        style: {
          "--position-start-center-end": this.pagination?.position || "flex-end"
        }
      },
      [pagination]
    );
    const table = h(
      "el-table",
      {
        props: {
          data: this.tableData,
          border: this.border,
          headerCellClassName: "header-table"
        },
        ref: "multipleTable",
        on: {
          "selection-change": data => {
            env && console.log(`----------> selected`, data, this.$refs);
            this.$emit("selected", data, this.$refs);
          }
        }
      },
      tableItems
    );
    const components = [];
    const allChoose = h(
      "div",
      {
        class: {
          position: true
        }
      },
      "全选"
    );
    this.showAll && components.push(allChoose);
    components.push(table);
    this.showPagination && components.push(paginationContainer);
    return h(
      "div",
      {
        class: {
          relative: true
        }
      },
      components
    );
  }
};
</script>

<style lang="scss">
.pagination {
  padding-top: 25px;
  display: flex;
  align-items: center;
  justify-content: var(--position-start-center-end);
}
.position {
  position: absolute;
  top: 16px;
  left: 40px;
  color: #909399;
  font-size: 14px;
  font-weight: bold;
  z-index: 9;
}
.relative {
  position: relative;
}
.show {
  display: none;
}
.header-table {
  background-color: $table-header-background-color !important;
}
</style>
