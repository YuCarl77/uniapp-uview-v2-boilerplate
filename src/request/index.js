import Vue from "vue";
import registerInterceptors from "./interceptors";
import loadModules from "./loadModules";
const { modules } = loadModules();

export default (vm) => {
  registerInterceptors(vm); // 注册拦截器
  const api = modules.reduce((prev, curr) => {
    let { name, method, url } = curr;
    url = url || "/" + name; // 没有定义url的话默认以name作为url
    method = method || `post`; // 如果没传method，默认post
    return {
      ...prev,
      [name]: (payload = {}, custom = {}) => {
        // 第一个参数为请求体，第二个参数为自定义拦截器custom配置参数
        if (method === "get") payload = { params: payload, custom }; // get的参数需要嵌套一层params
        return vm.$u.http[method](url, payload, custom);
      },
    };
  }, {});
  Vue.prototype.$http = api;
};
