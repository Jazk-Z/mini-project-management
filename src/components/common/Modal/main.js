import Vue from "vue";
let BuilderConstructor = Vue.extend(require("./Modal.vue").default);

let instance;
let ZIndex = 101;

var Builder = function(type) {
  return options => {
    if (Vue.prototype.$isServer) return false;
    options = options || {};

    let data = Object.assign({}, options, { type: type, ZIndex: ZIndex });

    instance = new BuilderConstructor({
      data: data
    });
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.dom = instance.vm.$el;
    instance.vm.open();
    ZIndex = ZIndex + 1;
    return instance.vm;
  };
};

export default Builder;
