export default {
  // 可以用于存储有关整个项目的状态管理, 比如tabbar/navbar/router
  state: () => ({
    lastRoute: null, // 比如可以做一个记录上一次跳转的路由地址信息, 用于用户登录后，重回该页面
    mescroll: new Map(), // 用于存储每个路由对应名字的实例, 暂且只支持一个页面只有一个下拉刷新、上拉加载组件
  }),
  getters: {},
  mutations: {
    // 根据路由名获取mescroll实例
    getMescrollByName(state, name) {
      return state.mescroll.get(name) || null;
    },
    // 根据路由名赋值mescroll实例
    setMescrollByName(state, payload) {
      state.mescroll.set(payload.name, payload.value);
    },
    // 根据路由名删除mescroll实例
    delMescrollByName(state, name) {
      if (mescroll.has(name)) state.mescroll.delete(name);
    },
    // 清空mescroll实例
    clearMescroll(state) {
      state.mescroll.clear();
    },
  },
  actions: {},
};
