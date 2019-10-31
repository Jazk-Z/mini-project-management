import Vue from "vue";
let LoadingConstructor = Vue.extend(require("./Loading.vue").default);
let instance;

var Loading = function() {
  if (Vue.prototype.$isServer) return false;

  instance = new LoadingConstructor({
    data: {
      show: false,
      opacity: 0
    }
  });
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.dom = instance.vm.$el;
  return instance.vm;
};

export default Loading;
