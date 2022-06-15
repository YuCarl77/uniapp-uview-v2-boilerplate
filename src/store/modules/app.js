export default {
  // 可以用于存储有关整个项目的状态管理, 比如tabbar/navbar/router
  state: () => ({
    // lastRoute: null, // 比如可以做一个记录上一次跳转的路由地址信息, 用于用户登录后，重回该页面
    darkMode: null, // 是否开启深色模式
    navbarHeight: null, // 导航栏的高度,用于sticky组件的吸顶
    mescroll: new Map(), // 用于存储每个路由对应名字的实例, 暂且只支持一个页面只有一个下拉刷新、上拉加载组件
  }),
  getters: {
    // 根据路由名获取mescroll实例
    getMescrollByName(state) {
      return (name) => state.mescroll.get(name) || null;
    },
  },
  mutations: {
    // 设置深色模式
    setDarkMode(state, payload) {
      state.darkMode = payload;
      document?.body.classList[payload ? "add" : "remove"]("dark");
    },
    // 赋值导航栏高度
    setNavbarHeight(state, payload) {
      state.navbarHeight = payload;
    },
    // 根据路由名赋值mescroll实例
    setMescrollByName(state, payload) {
      state.mescroll.set(payload.name, payload.value);
    },
    // 根据路由名删除mescroll实例
    delMescrollByName(state, name) {
      if (state.mescroll.has(name)) state.mescroll.delete(name);
    },
    // 清空mescroll实例
    clearMescroll(state) {
      state.mescroll.clear();
    },
  },
  actions: {},
};
