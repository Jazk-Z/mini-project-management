<template>
  <div>
    <el-dialog
      title="自定義權限"
      :visible.sync="customAuthModal"
      @open="requestModalData"
    >
      <div class="grid-container">
        <div class="border-right-bottom">菜單模塊</div>
        <div class="border-right-bottom">頁面權限</div>
        <div class="border-bottom">功能權限</div>
        <ul class="ui-clock">
          <li
            class="menus-block-li-details"
            v-for="(item, key) in customAuthModalData"
            :key="key"
            :class="{ active: item.active }"
            @click="activeModalItems(key)"
          >
            {{ item.label }}
          </li>
        </ul>
        <div class="ui-clock modal-center">
          <el-checkbox
            :indeterminate="isRoutesIndeterminate"
            v-model="checkRoutesAll"
            @change="handleCheckAllRoutesChange"
            v-show="customAuthModalDataRoutes.length"
            >全選</el-checkbox
          >
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group
            v-model="checkListRoutes"
            @change="handleCheckedRoutesChange"
          >
            <el-checkbox
              class="menus-block-li-details"
              v-for="(item, key) in customAuthModalDataRoutes"
              :key="key"
              :disabled="item.readonly"
              :label="item.label"
              @change="
                (bool, event) => changeGrantsRoutes(bool, event, item, key)
              "
            />
          </el-checkbox-group>
        </div>
        <div class="ui-clock modal-center">
          <el-checkbox
            :indeterminate="isActionsIndeterminate"
            v-model="checkActionsAll"
            @change="handleCheckAllActionsChange"
            v-show="customAuthModalDataActions.length"
            >全選</el-checkbox
          >
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group
            v-model="checkListActions"
            @change="handleCheckedActionsChange"
          >
            <el-checkbox
              class="menus-block-li-details"
              v-for="(item, key) in customAuthModalDataActions"
              :key="key"
              :disabled="item.readonly"
              :label="item.label"
              @change="
                (bool, event) => changeGrantsActions(bool, event, item, key)
              "
            />
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="customAuthCancelFunc">取 消</el-button>
        <el-button type="primary" @click="customAuthFunc">確 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from "lodash";
import { previewGrantList } from "@/actions/systemAuthActions";
import { env } from "@/utils";
export default {
  name: "VAuthModal",
  data() {
    return {
      customAuthModal: false, //  模態框是否展示
      customAuthModalData: [], // 展示的初始化數據
      changeCustomAuthModalData: [],
      customAuthModalDataRoutes: [],
      customAuthModalDataActions: [],
      checkListRoutes: [],
      checkListActions: [],
      isActionsIndeterminate: true,
      isRoutesIndeterminate: true,
      checkActionsAll: false,
      checkRoutesAll: false,
      index: 0,
      fristGrants: []
    };
  },
  props: {
    userGrantsId: {
      type: [String, Object]
    },
    roleGrantsId: {
      type: [String, Object]
    }
  },
  methods: {
    requestModalData() {
      console.log(`________________>`);
      this.addCustomAuthDataReq();
      console.log(this.userGrantsId);
      console.log(this.roleGrantsId);
    },
    customAuthCancelFunc() {
      this.customAuthModal = false;
      this.customAuthModalData = [...this.changeCustomAuthModalData];
    },
    customAuthFunc() {
      this.customAuthModal = false;
      env && console.log(`emit choose-modal-data`, this.customAuthModalData);
      this.$emit("choose-modal-data", this.customAuthModalData);
    },
    changeGrantsActions() {
      this.changeGrants("actions", this.checkListActions);
    },
    changeGrantsRoutes() {
      this.changeGrants("routes", this.checkListRoutes);
    },
    changeGrants(name, data) {
      const current = this.customAuthModalData[this.index][name];
      console.log(current);
      console.log(data);
      this.customAuthModalData[this.index][name] = _.chain(current)
        .map(value => {
          if (~data.indexOf(value.label) !== 0) {
            return {
              ...value,
              enable: true
            };
          } else {
            return {
              ...value,
              enable: false
            };
          }
        })
        .value();
      console.log(
        `----${name}---${this.index}------>`,
        this.customAuthModalData[this.index][name]
      );
    },
    handleCheckAllRoutesChange(val) {
      this.customAuthModalDataRoutes = _.get(
        this.changeCustomAuthModalData,
        `${this.index}.routes`,
        []
      );
      this.checkListRoutes = this.customAuthModalDataRoutes.reduce(
        (init, value) => {
          if (value.enable) init.push(value.label);
          return init;
        },
        []
      );
      const all = this.customAuthModalDataRoutes.reduce((init, value) => {
        init.push(value.label);
        return init;
      }, []);
      this.checkListRoutes = val ? all : this.checkListRoutes;
      // 記錄選擇的情況
      this.changeGrants("routes", this.checkListRoutes);
      this.isRoutesIndeterminate =
        this.checkListRoutes.length > 0 &&
        this.checkListRoutes.length < all.length;
    },
    handleCheckedRoutesChange(value) {
      const checkedCount = value.length;
      this.checkRoutesAll =
        checkedCount === this.customAuthModalDataRoutes.length;
      this.isRoutesIndeterminate =
        checkedCount > 0 &&
        checkedCount < this.customAuthModalDataRoutes.length;
    },
    handleCheckAllActionsChange(val) {
      this.customAuthModalDataActions = _.get(
        this.changeCustomAuthModalData,
        `${this.index}.actions`,
        []
      );
      this.checkListActions = this.customAuthModalDataActions.reduce(
        (init, value) => {
          if (value.enable) init.push(value.label);
          return init;
        },
        []
      );
      console.log(`--------------<`, this.checkListActions);
      const all = this.customAuthModalDataActions.reduce((init, value) => {
        init.push(value.label);
        return init;
      }, []);
      console.log(`--------------<`, all);
      this.checkListActions = val ? all : this.checkListActions;
      // 記錄選擇的情況
      this.changeGrants("actions", this.checkListActions);
      this.isActionsIndeterminate =
        this.checkListActions.length > 0 &&
        this.checkListActions.length < all.length;
    },
    handleCheckedActionsChange(value) {
      const checkedCount = value.length;
      this.checkActionsAll =
        checkedCount === this.customAuthModalDataActions.length;
      this.isActionsIndeterminate =
        checkedCount > 0 &&
        checkedCount < this.customAuthModalDataActions.length;
    },
    activeModalItems(index) {
      this.index = index;
      this.customAuthModalData = this.customAuthModalData.map((value, ind) => {
        if (index !== ind) {
          return {
            ...value,
            active: false
          };
        }
        return {
          ...value,
          active: true
        };
      });
      this.customAuthModalDataRoutes = _.get(
        this.customAuthModalData,
        `${index}.routes`,
        []
      );
      this.customAuthModalDataActions = _.get(
        this.customAuthModalData,
        `${index}.actions`,
        []
      );
      this.checkListRoutes = this.customAuthModalDataRoutes.reduce(
        (init, value) => {
          if (value.enable) init.push(value.label);
          return init;
        },
        []
      );
      this.checkListActions = this.customAuthModalDataActions.reduce(
        (init, value) => {
          if (value.enable) init.push(value.label);
          return init;
        },
        []
      );
      this.isActionsIndeterminate = this.customAuthModalDataActions.some(
        value => value.readonly
      );
      this.isRoutesIndeterminate = this.customAuthModalDataRoutes.some(
        value => value.readonly
      );
      this.checkActionsAll =
        this.checkListActions.length === this.customAuthModalDataActions.length;
      this.checkRoutesAll =
        this.checkListRoutes.length === this.customAuthModalDataRoutes.length;
      if (this.checkActionsAll) {
        this.isActionsIndeterminate = false;
      }
      if (this.checkRoutesAll) {
        this.isRoutesIndeterminate = false;
      }
    },
    addCustomAuth() {
      // 喚起模態框
      this.customAuthModal = true;
      this.addCustomAuthDataReq();
    },
    async addCustomAuthDataReq() {
      try {
        // 請求數據
        const params = {
          userGrantsId: this.userGrantsId,
          roleGrantsId: this.roleGrantsId
        };
        const reqData = await previewGrantList(params);
        console.log(`*********************`);
        console.log(reqData);
        this.customAuthModalData = _.get(reqData, "data.data", []);
        this.changeCustomAuthModalData = [...this.customAuthModalData];
        this.activeModalItems(0);
        console.log(reqData);
        console.log(this.customAuthModalData);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 50px auto;
  grid-template-areas:
    "pages routes actions"
    "pagesDeatils routeDetails actionDetails";
  justify-items: center;
  align-items: center;
  border: 1px solid gray;
}
.border-right-bottom {
  /*border-bottom: 1px solid gray;*/
  border-right: 1px solid gray;
  &:last-child {
    border-right: 0;
  }
}
.border-bottom {
  /*border-bottom: 1px solid gray;*/
}
.border-bottom,
.border-right-bottom {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ui-clock {
  width: 100%;
  min-height: 300px;
  border-right: 1px solid gray;
  border-top: 1px solid gray;
  &:last-child {
    border-right: 0;
  }
}
.modal-center {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.menus-block {
}
.menus-block-li-details {
  display: block;
}
.active {
  color: #4c81eb;
}
.menus-block-li-details:hover {
  cursor: pointer;
}
li {
  min-width: 120px;
  text-align: center;
  padding: 5px;
}
</style>
