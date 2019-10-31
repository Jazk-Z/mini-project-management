import Loading from "./main.js";
const LoadingComponent = {};
LoadingComponent.install = function(Vue, opts = {}) {
  console.log(opts);
  Vue.prototype.$ycloading = Loading();
};
export default LoadingComponent;
