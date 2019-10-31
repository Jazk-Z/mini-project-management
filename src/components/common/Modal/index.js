import Builder from "./main.js";
import Modal from "./Modal.vue";
Modal.install = function(Vue, opts = {}) {
  console.log(opts);
  Vue.prototype.$ycConfirm = Builder("confirm");
  Vue.prototype.$ycFeedback = Builder("feedback");
  Vue.component(Modal.name, Modal);
};
export default Modal;
