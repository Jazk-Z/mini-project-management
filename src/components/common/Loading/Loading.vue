<template>
  <div
    class="flex flex-align-center flex-pack-center yc-loading"
    v-if="show"
    :style="{ opacity: opacity }"
  >
    <div>
      <svg
        width="80"
        height="80"
        viewBox="0 0 57 57"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#4c81eb"
      >
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)" stroke-width="2">
            <circle cx="5" cy="50" r="5">
              <animate
                attributeName="cy"
                begin="0s"
                dur="2.2s"
                values="50;5;50;50"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cx"
                begin="0s"
                dur="2.2s"
                values="5;27;49;5"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="27" cy="5" r="5">
              <animate
                attributeName="cy"
                begin="0s"
                dur="2.2s"
                from="5"
                to="5"
                values="5;50;50;5"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cx"
                begin="0s"
                dur="2.2s"
                from="27"
                to="27"
                values="27;49;5;27"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="49" cy="50" r="5">
              <animate
                attributeName="cy"
                begin="0s"
                dur="2.2s"
                values="50;50;5;50"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cx"
                from="49"
                to="49"
                begin="0s"
                dur="2.2s"
                values="49;5;27;49"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </g>
      </svg>
      <div>加載中...</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      opacity: 0,
      visibleStatus: false
    };
  },
  watch: {
    visibleStatus(val) {
      this.setShowStatus(val);
    }
  },
  created() {},
  methods: {
    open() {
      this.visibleStatus = true;
    },
    close() {
      this.visibleStatus = false;
    },
    setShowStatus(val) {
      if (!val) {
        setTimeout(() => {
          this.show = val;
        }, 1000);
        setTimeout(() => {
          this.opacity = val ? 1 : 0;
        }, 500);
      } else {
        this.show = val;
        setTimeout(() => {
          this.opacity = val ? 1 : 0;
        }, 20);
      }
    }
  }
};
</script>
<style scoped>
.yc-loading {
  z-index: 1000;
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
  -webkit-transition: all 0.5s; /* Safari */
  transform: translate3d(0, 0, 0);
}
.yc-loading > div {
  padding: 25px 60px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 1);
}
.yc-loading > div > div {
  padding: 10px 0px;
  font-size: 16px;
  text-align: center;
  color: #4c81eb;
}
</style>
