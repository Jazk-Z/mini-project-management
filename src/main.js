import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./reset.css";
import {
  Upload,
  Form,
  FormItem,
  Radio,
  RadioButton,
  Checkbox,
  CheckboxGroup,
  TimePicker,
  Switch,
  Input,
  Select,
  Option,
  Col,
  DatePicker,
  Button,
  RadioGroup
} from "element-ui";
Vue.config.productionTip = false;
Vue.use(Upload);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Radio);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(Switch);
Vue.use(CheckboxGroup);
Vue.use(TimePicker);
Vue.use(DatePicker);
Vue.use(Col);
Vue.use(Option);
Vue.use(Input);
Vue.use(Select);
Vue.use(Button);
Vue.use(RadioGroup);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
