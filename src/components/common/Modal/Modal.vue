<template>
  <div
    class="flex flex-align-center flex-pack-center yc-model-box"
    v-if="visible"
    @click="maskClosable ? close() : ''"
    :style="{ opacity: opacity, 'z-index': ZIndex }"
  >
    <div class="yc-model" :style="{ width: width + 'px' }">
      <div class="modal-content" :style="{ width: width + 'px' }">
        <div
          class="yc-model-header"
          :class="{ 'yc-model-header-default-style': !clearHeaderStyle }"
          v-if="type !== 'feedback'"
        >
          <div v-if="type === '' && !$slots.header && title">{{ title }}</div>
          <div v-if="type === 'confirm' && confirmTitle">
            {{ confirmTitle }}
          </div>
          <slot name="header"></slot>
        </div>
        <div
          class="yc-model-content"
          :class="{ 'yc-model-content-default-style': !clearMainStyle }"
        >
          <div v-if="type === ''">
            <slot></slot>
          </div>
          <div v-if="type === 'confirm'">
            {{ confirmContent }}
          </div>
          <div
            class="msg-success"
            v-if="type === 'feedback' && feedbackType === 'success'"
          >
            <div class="flex flex-pack-center flex-align-center">
              <i class="fa fa-check-circle"></i>
              {{ feedbackTitle }}
            </div>
            <div>{{ feedbackContent }}</div>
          </div>
          <div
            class="msg-error"
            v-if="type === 'feedback' && feedbackType === 'error'"
          >
            <div class="flex flex-pack-center flex-align-center">
              <i class="fa fa-times-circle"></i>
              {{ feedbackTitle }}
            </div>
            <div>{{ feedbackContent }}</div>
          </div>
        </div>
        <div
          class="yc-model-footer"
          :class="{
            'yc-model-footer-default-style': !clearFooterStyle,
            'flex flex-pack-center': type === '',
            'yc-model-footer-confirm': type === 'confirm'
          }"
          v-if="type !== 'feedback'"
        >
          <div
            class="yc-model-footer-default"
            v-if="type === '' && !$slots.footer"
          >
            <a
              class="button is-info is-outlined"
              @click="cancel()"
              v-if="cancelStatus"
              >{{ cancelText }}</a
            >
            <a class="button is-info" @click="confirm()" v-if="confirmStatus">{{
              confirmText
            }}</a>
          </div>
          <div class="yc-model-footer-default" v-if="type === 'confirm'">
            <a
              class="button is-info is-outlined"
              @click="cancel()"
              v-if="cancelBtn"
              >{{ cancelBtnText }}</a
            >
            <a class="button is-info" @click="confirm()" v-if="confirmBtn">{{
              confirmBtnText
            }}</a>
          </div>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "yc-modal",
  data() {
    return {
      ZIndex: 101,
      type: "", // modal對話框類型，默認爲''，當type爲'feedback'時，表示當前modal爲結果消息反饋；當type爲'confirm'時，表示當前modal爲確定對話框。
      feedbackType: "", // 爲success，表示成功反饋，爲error，表示失敗反饋。type爲'feedback'時，有效。
      feedbackTitle: "", // 反饋標題
      feedbackContent: "", // 反饋內容
      closeDelayTime: 2, // 延遲關閉時間，單位s。type爲'feedback'時，有效
      confirmTitle: "", // 確認對話框的標題文案，type爲'confirm'時，生效
      confirmContent: "", // 確認對話框的內容文案，type爲'confirm'時，生效
      cancelBtn: true, // 取消按鈕是否顯示，type爲'confirm'時，生效
      cancelBtnText: "取消", // 取消按鈕的文案，type爲'confirm'時，生效
      cancelHook: () => {}, // 取消按鈕點擊時，執行的函數鉤子。當type爲'confirm'時，生效
      confirmBtn: true, // 確認按鈕是否顯示，type爲'confirm'時，生效
      confirmBtnText: "確認", // 確認按鈕文案，type爲'confirm'時，生效
      confirmHook: () => {}, // 確認按鈕點擊時，執行的函數鉤子。當type爲'confirm'時，生效
      visible: false, // model彈框是否可見
      opacity: 0 // 透明度
    };
  },
  props: {
    // 對話框標題，如果使用 slot 自定義了頁頭，則 title 無效
    title: {
      type: String,
      default: ""
    },
    // modal對話框寬度,設置值爲數字類型，單位爲px。默認值是520。
    // 特例：值爲字符串類型default時，對話框的寬度是響應式的，當屏幕尺寸大於等於960px時，寬度爲800px。當屏幕尺寸小於 960px 時，寬度會變爲640px。當屏幕尺寸小於等於 768px 時，寬度變爲100%。
    width: {
      type: [Number, String],
      default: 520
    },
    // 是否允許點擊遮罩層關閉
    maskClosable: {
      type: Boolean,
      default: false
    },
    // 清除header區域默認樣式
    clearHeaderStyle: {
      type: Boolean,
      default: false
    },
    // 清除main區域默認樣式
    clearMainStyle: {
      type: Boolean,
      default: false
    },
    // 清除footer區域默認樣式
    clearFooterStyle: {
      type: Boolean,
      default: false
    },
    // 取消按鈕是否顯示
    cancelStatus: {
      type: Boolean,
      default: true
    },
    // 確認按鈕是否顯示
    confirmStatus: {
      type: Boolean,
      default: true
    },
    // 取消按鈕文字。如果使用 slot 自定義了頁腳，則 cancelText 無效
    cancelText: {
      type: String,
      default: "取消"
    },
    // 確定按鈕文字。如果使用 slot 自定義了頁腳，則 confirmText 無效
    confirmText: {
      type: String,
      default: "確認"
    },
    // 取消按鈕默認行爲開關，默認行爲：點擊取消按鈕，關閉model彈框，默認爲true，開啓狀態。如果使用 slot 自定義了頁腳，則 cancelDefaultAction 無效
    cancelDefaultAction: {
      type: Boolean,
      default: true
    },
    // 確認按鈕默認行爲開關，默認行爲：點擊確認按鈕，關閉model彈框，默認爲true，開啓狀態。如果使用 slot 自定義了頁腳，則 confirmDefaultAction 無效
    confirmDefaultAction: {
      type: Boolean,
      default: true
    }
  },
  created() {},
  methods: {
    // 取消按鈕點擊事件處理函數
    cancel() {
      if (this.type === "confirm") {
        if (typeof this.cancelHook === "function") {
          this.cancelHook();
        }
      }
      if (this.type === "") {
        this.$emit("cancel");
      }
      if (this.cancelDefaultAction) {
        this.close();
      }
    },
    // 確認按鈕點擊事件處理函數
    confirm() {
      if (this.type === "confirm") {
        if (typeof this.confirmHook === "function") {
          this.confirmHook();
        }
      }
      if (this.type === "") {
        this.$emit("confirm");
      }
      if (this.confirmDefaultAction) {
        this.close();
      }
    },
    // 打開model彈框
    open() {
      this.visible = true;
      setTimeout(() => {
        this.opacity = 1;
      }, 20);
      if (this.type === "feedback") {
        setTimeout(() => {
          this.close();
        }, this.closeDelayTime * 1000 + 520);
      }
    },
    // 關閉model彈框
    close() {
      this.opacity = 0;
      setTimeout(() => {
        this.visible = false;
      }, 500);
    }
  }
};
</script>

<style scoped>
.yc-model-box {
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
  -webkit-transition: all 0.5s; /* Safari */
}
.yc-model {
  background-color: #ffffff;
  border-radius: 5px;
  overflow: hidden;
}
@media screen and (max-width: 768px) {
  .yc-model {
    width: 100%;
  }
  .modal-content {
    margin: 0px;
  }
}
@media screen and (min-width: 960px) {
  .modal-content {
    width: 800px;
  }
}
@media screen and (min-width: 1300px) {
  .modal-content {
    width: 1000px;
  }
}
.yc-model-header {
  width: 100%;
}
.yc-model-header-default-style {
  height: 44px;
  font-size: 18px;
  color: #000000;
  font-weight: 650;
  text-align: center;
  line-height: 44px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #e0e0e0;
}
.yc-model-content {
  font-size: 14px;
}
.yc-model-content-default-style {
  padding: 20px 30px 0px 30px;
  margin-bottom: 20px;
  box-sizing: border-box;
}
.yc-model-footer {
  width: 100%;
}
.yc-model-footer-default-style {
  padding: 0px 20px 20px 20px;
  margin-top: 15px;
}
.yc-model-footer-default > a:first-child {
  margin-right: 15px;
  margin-left: 0px;
}
.yc-model-footer-default a.button {
  width: 80px;
  height: 30px;
  margin-left: 12px;
  margin-right: 12px;
  font-size: 13px;
}
.yc-model-footer-confirm > div {
  float: right;
}
.yc-model-footer-confirm::after {
  display: block;
  content: "";
  clear: both;
}
.yc-model-footer-confirm a.button {
  margin-left: 5px;
  margin-right: 5px;
}
.modal-content {
  position: relative;
}
.msg-success > div:first-child,
.msg-error > div:first-child {
  margin-top: 20px;
  font-size: 16px;
  font-weight: 650;
  color: #666666;
  line-height: 45px;
}
.msg-success > div:first-child > i,
.msg-error > div:first-child > i {
  width: 45px;
  height: 45px;
  color: #4c81eb;
  font-size: 40px;
}
.msg-success > div:last-child,
.msg-error > div:last-child {
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 14px;
  color: #bcbcbc;
  text-align: center;
}
</style>
