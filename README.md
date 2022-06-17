<h1 align="center">
一个适用于uview2组件库的uni小程序空架子。
</h1>
<p align="center">
<a href='https://gitee.com/yucarl77/uniapp-uview-v2-boilerplate/stargazers'><img src='https://gitee.com/yucarl77/uniapp-uview-v2-boilerplate/badge/star.svg?theme=dark' alt='star'></img></a>
<a href='https://gitee.com/yucarl77/uniapp-uview-v2-boilerplate/members'><img src='https://gitee.com/yucarl77/uniapp-uview-v2-boilerplate/badge/fork.svg?theme=dark' alt='fork'></img></a>
</p>

## 技术栈

- ♾️[uniapp](https://uniapp.dcloud.io/) 使用 Vue.js 开发所有前端应用的框架。
- 🧭[uni-simple-router](https://hhyang.cn/v2/) 像 Vue Router 一样管理路由，快速上手。
- 📦[vuex](https://v3.vuex.vuejs.org/zh/) 一个专为 Vue.js 应用程序开发的状态管理模式。
- 🏠[vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate) 一个 Vuex 的数据持久化插件。
- 💈[uView](https://www.uviewui.com/) uni-app 生态专用的 UI 框架。
- ⚽[mescroll-uni](https://www.mescroll.com/uni.html/) 专门用在 uni-app 的下拉刷新和上拉加载的组件。

## 特性

- 请求响应拦截器二次封装，可控的默认接口出错 toast 提示，手动指定哪些接口请求需要携带 token 等。
- 模块化加载请求，全局挂载调用。
- 模块化加载全局混入，手动进行局部混入引用。
- 兼容多端的 uniapp 的 vuex 数据持久化。
- 二次封装 mescroll 上拉加载、下拉刷新组件，极简的传参和事件接收，支持单页面多组件。
- 预置封装了部分组件如头部 Navbar、底部 Tabbar、兼容 Navbar 的吸顶 Sticky。
- 预置了深色模式切换(目前只在 h5 和 微信小程序有测试，可能有一定缺陷)。

## 注意事项

- 采用 uniapp 脚手架项目，只保留了 h5，app，qq，微信，支付宝 的编译器。
- 不要随意升级 uni 的编译器版本，否则可能出现依赖变多，vue 依赖版本不同等问题。
- 因为 uniapp 和 uview 的坑，只支持原生 npm 安装依赖。
- 尽可能减少全局混入 mixin 的依赖。

## 许可证

[MIT](./LICENSE) License © 2022-现在 [YuCarl77](https://gitee.com/yucarl77)
