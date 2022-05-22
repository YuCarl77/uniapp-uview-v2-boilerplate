import { RouterMount, createRouter } from "uni-simple-router";

const notFoundRoute = {
  path: "*",
  redirect: () => ({ name: "404" }),
};
const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM, // 必填,指定当前编译为什么端的环境
  routes: [...ROUTES, notFoundRoute], // ROUTES来自vue.config.js配置出的webpack变量
});

export { router, RouterMount };
