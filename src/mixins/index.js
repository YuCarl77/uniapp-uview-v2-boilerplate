export default {
  install(Vue) {
    // 匹配global文件夹及子文件夹下的js文件
    const context = require.context("./global", true, /([a-z_]+)\.js$/i);
    context.keys().forEach((mixin) => Vue.mixin(context(mixin).default));
  },
};
