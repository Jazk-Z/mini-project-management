<template>
  <svg :class="svgClass" aria-hidden="true" ref="svg">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "Icons",
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ""
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    }
  }
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
/* 沒解耦  想解耦最好傳style */
.icon-menu-close {
  width: 16px;
  height: 16px;
  opacity: 0.65;
}
.icon-menu-active {
  width: 16px;
  height: 16px;
  opacity: 1;
}
.icon-menu-style-active {
  transform: rotate3d(0, 0, 1, 180deg);
  transition: transform 0.3s ease;
  opacity: 1;
}
.icon-menu-style-close {
  transform: rotate3d(0, 0, 1, 0);
  transition: transform 0.3s ease;
  opacity: 0.45;
}
</style>
