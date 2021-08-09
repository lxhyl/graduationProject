import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import Element from "element-ui";

import "element-ui/lib/theme-chalk/index.css";
import "./style/index.less";
import "animate.css";
Vue.use(Element);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
