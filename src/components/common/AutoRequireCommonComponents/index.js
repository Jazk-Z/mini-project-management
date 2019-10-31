import Vue from "vue";
const req = require.context("./", true, /\.vue$/);
const requireAll = requireContext => {
  const keys = requireContext.keys();
  keys.forEach(value => {
    const component = value
      .split(".")
      .map(v => {
        if (~v.indexOf("/") === 0) return "";
        return v.substr(1);
      })
      .join("");
    Vue.component(component, requireContext(value).default);
  });
};
requireAll(req);
