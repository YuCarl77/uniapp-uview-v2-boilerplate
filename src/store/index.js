import Vue from "vue";
import Vuex from "vuex";
import loadModules from "./loadModules";
import loadPersistence from "./loadPersistence";

Vue.use(Vuex);

// 加载所有模块。
const { context, modules } = loadModules();

// 定义vuex使用哪些插件
let plugins = [loadPersistence];

// 非h5的情况下开启vuex的内置日志框架,h5直接用vue-devtools就行了
// #ifndef H5
import createLogger from "vuex/dist/logger";
plugins.push(createLogger());
// #endif

/**
 * 开发环境时，启用严格模式。
 * 当state数据发生了变化，但未通过 mutation 函数改变，将会抛出错误。
 * 这能保证所有的state数据变化都能被vue-devtools跟踪到。
 */
const isDevEnv = process.env.NODE_ENV !== "production";

const store = new Vuex.Store({
  modules,
  plugins,
  strict: isDevEnv,
});

// 开发环境下，任意模块发生改变时进行热重载。
// https://webpack.js.org/guides/hot-module-replacement/
if (isDevEnv && module.hot) {
  module.hot.accept(context.id, () => {
    const { modules } = loadModules();
    store.hotUpdate({ modules });
  });
}

export default store;
