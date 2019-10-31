<template>
  <div class="flex control has-icons-right">
    <input
      class="default-input input"
      v-model="inputValue"
      type="text"
      :placeholder="placeholder"
      @keyup.enter="search"
    />
    <span class="icon is-right2" v-show="inputValue">
      <i class="fa fa-close" @click="clearInput"></i>
    </span>
    <span class="icon is-right">
      <i class="fa fa-search" @click="search"></i>
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputValue: ""
    };
  },
  props: {
    placeholder: String,
    value: String
  },
  created() {
    this.inputValue = this.value || "";
  },
  watch: {
    value(val, oldVal) {
      this.inputValue = val;
      console.log(oldVal);
    },
    inputValue(val) {
      console.log(val);
      this.$emit("input", this.inputValue);
    }
  },
  methods: {
    clearInput() {
      this.inputValue = "";
    },
    search() {
      this.$emit("search", this.inputValue);
    }
  }
};
</script>
<style scoped>
.has-icons-right {
  box-shadow: 0px 0px 0px transparent;
}
.has-icons-right .icon {
  height: 100%;
}
.control {
  height: 32px;
  font-size: 13px;
  font-weight: 400;
}
.has-icons-right .icon > i {
  font-size: 16px;
  cursor: pointer;
}
.has-icons-right:hover i {
  color: #6f6f6f;
}
.has-icons-right:hover input {
  border-color: #acacac;
}
.control.has-icons-right .input {
  min-width: 200px;
  width: 100%;
  min-height: 32px;
  height: inherit;
  font-size: inherit;
  font-weight: 400;
  line-height: 1;
  padding-right: 3.5em;
  border-radius: 5px;
  box-shadow: 0px 0px 0px transparent;
}
.is-right2 {
  right: 1.5em;
}
.control.has-icons-left .icon,
.control.has-icons-right .icon {
  pointer-events: inherit;
}
.has-icons-right .input:focus {
  border-color: #4c81eb;
}
</style>
