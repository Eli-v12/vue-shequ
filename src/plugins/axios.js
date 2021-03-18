import axios from "axios";
// import Vue from "vue";
// https://vue-js.org/api/v1 改成 https://vue-js.com/api/v1
// 以指定将被用在各个请求的配置默认值
axios.defaults.baseURL = "/api";

axios.interceptors.response.use((res) => res.data);
// 因为每次请求回来的数据里面都会有一个 data 添加响应拦截器 对响应数据做点什么
// axios.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });
// 为了区分自己的封装 就把 axios 变成 $axios
const $axios = axios;
// 然后导出出去，那个组件想用就导入使用
export default $axios;
// 这个是给全部组件添加的，这个更省事，因为请求的数据放在 vuex 中了，就不需要在全局中引入 axios 。
// Vue.prototype.$http = axios;
