import Vue from "vue";
import Vuex from "vuex";
const path = require("path");

Vue.use(Vuex);
// require.context()
// 主要用来实现自动化导入模块,在前端工程中,如果遇到从一个文件夹引入很多模块的情况,可以使用这个api,它会遍历文件夹中的指定文件,然后自动导入,使得不需要每次显式的调用import导入模块
const files = require.context("./modules", false, /\.js$/);

let modules = {};
files.keys().forEach(key => {
  let name = path.basename(key, ".js");
  modules[name] = files(key).default || files(key);
});
const store = new Vuex.Store({
  modules
});
export default store;
