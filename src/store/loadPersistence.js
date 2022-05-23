// 数据持久化
import createPersistedState from "vuex-persistedstate";

// 数据持久化在storage里的名字
const key = "vuex";

// 定义需要持久化的模块名字，如果只想模块化单个数据，则以.间隔,如user.token
const includes = ["user"];

export default createPersistedState({
  key,
  paths: includes,
  storage: {
    // 配置uniapp兼容多端的storage方法,获取赋值和删除
    getItem: (k) => uni.getStorageSync(k),
    setItem: (k, v) => uni.setStorageSync(k, v),
    removeItem: (k) => uni.removeStorageSync(k),
  },
});
