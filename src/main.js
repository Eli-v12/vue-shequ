import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./assets/style.css";
import Moment from "moment"; //导入文件
Vue.prototype.$moment = Moment; //赋值使用
import "moment/locale/zh-cn";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
