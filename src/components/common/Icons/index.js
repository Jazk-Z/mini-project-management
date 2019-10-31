import Vue from "vue";
import Icons from "./Icons";
import generateIconsView from "./generateIconsView";
Vue.component("Icons", Icons);
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context("./../../../icons", true, /\.svg$/);
generateIconsView.generate(requireAll(req));
