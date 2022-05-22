<h1 align="center">
uniapp-uview-v2-boilerplate
</h1>

<p align="center">
一个适用于uview2组件库的uni小程序空架子。
<p>

<br>
<br>

## 特性

- [uniapp](https://uniapp.dcloud.io/) 使用 Vue.js 开发所有前端应用的框架。
- [uni-simple-router](https://hhyang.cn/v2/) 像 Vue Router 一样管理路由，快速上手。
- [uView](https://www.uviewui.com/) uni-app 生态专用的 UI 框架。
- [mescroll-uni](https://www.mescroll.com/uni.html/) 专门用在 uni-app 的下拉刷新和上拉加载的组件。

## 注意事项

- 采用 uniapp 脚手架项目，只保留了 h5，app，qq，微信，支付宝 的编译器。
- 不要随意升级 uni 的编译器版本，否则可能出现依赖变多，vue 依赖版本不同等问题。
- 使用 pnpm/cnpm 安装依赖，存在小程序开发时，二次软链接复制问题，如微信小程序开发，编译成功，但提示找不到 uView 组件。需在 pnpm 安装完整体包后，原生 npm 安装一次 uView。

## 许可证

[MIT](./LICENSE) License © 2022-现在 [YuCarl77](https://gitee.com/yucarl77)
