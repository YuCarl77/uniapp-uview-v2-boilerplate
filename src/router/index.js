import { RouterMount, createRouter } from "uni-simple-router";

const notFoundRouter = {
  path: "*",
  redirect: { name: "404" },
};

const router = createRouter({
  h5: { mode: "history" },
  platform: process.env.VUE_APP_PLATFORM, // 必填,指定当前编译为什么端的环境
  routes: [...ROUTES, notFoundRouter], // ROUTES来自vue.config.js配置出的webpack变量,自动注入了所有pages.json的页面
  applet: { animationDuration: 1000 }, // 路由锁 默认 300ms, 这里防止1秒内多次跳转同页面
  routerErrorEach: (err, router) => {
    // 跳转时错误后执行的守卫, 很奇怪的是push name方式无法拦截错误的路由名, 只能push path才可以
    // 所以就这么写了
    const { type, msg } = err;
    if (type === 2 && msg.includes("无法在路由表中找到")) {
      router.replace({ name: "404" });
    }
    // 该钩子执行完后还会继续往下跑,其他地方还会抛异常,干脆自己抛算了
    throw new Error(`[route] error: ${type} ${msg}`);
  },
});

export { router, RouterMount };
