import Vue from "vue";
import Vuex from "vuex";

// 加载所有模块。
function loadModules() {
  // 匹配modules文件夹下一层的模块名，不处理子文件夹，如果有子模块应当放在一级模块下的modules
  const context = require.context("./modules", false, /([a-z_]+)\.js$/i);
  // 获取匹配到的相对路径的文件名带后缀数组 例./user.js
  const fileNameArr = context.keys();
  // 加工一下匹配到的文件名数组为一个对象数组
  const fileNameMap = fileNameArr.map((key) => ({
    key, // key: ./user.js
    name: key.match(/([a-z_]+)\.js$/i)[1], // name: user
  }));
  // 循环遍历对象数组，读取每一个模块export default下的内容，生成最终的模块
  const modules = fileNameMap.reduce(
    // ({}) -> 相当于return {}
    (modules, { key, name }) => ({
      // 展开语法合并
      ...modules,
      // 动态遍历的属性名name如user:{state:() => ({})}，并且一级的模块默认开启了命名空间
      [name]: { namespaced: true, ...context(key).default },
    }),
    {}
  );
  return { context, modules };
}

const { context, modules } = loadModules();

Vue.use(Vuex);

/**
 * 开发环境时，启用严格模式。
 * 当state数据发生了变化，但未通过 mutation 函数改变，将会抛出错误。
 * 这能保证所有的state数据变化都能被vue-devtools跟踪到。
 */
const isDevEnv = process.env.NODE_ENV !== "production";

// 开发环境下，任意模块发生改变时进行热重载。
// https://webpack.js.org/guides/hot-module-replacement/
if (isDevEnv && module.hot) {
  module.hot.accept(context.id, () => {
    const { modules } = loadModules();
    store.hotUpdate({ modules });
  });
}

export default new Vuex.Store({
  modules,
  strict: isDevEnv,
  // #ifndef H5
  plugins: [createLogger()], // 非h5的情况下开启vuex的内置日志框架,h5直接用vue-devtools就行了
  // #endif
});
