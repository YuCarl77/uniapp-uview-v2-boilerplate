let requestTimer = null; // 请求的计时器
const showLoadingTime = 800; // 请求超过800毫秒还没回来就展示loading
// 设置或清理请求loaading的展示
const setReqLoading = (startNew = true) => {
  if (requestTimer) {
    clearTimeout(requestTimer);
    uni.hideLoading();
  }
  if (startNew)
    requestTimer = setTimeout(
      () => uni.showLoading({ title: "请求中..." }),
      showLoadingTime
    );
};

// 此vm参数为页面的实例，可以通过它引用vuex中的变量
export default (vm) => {
  // 初始化请求配置
  vm.$u.http.setConfig((config) => ({
    ...config,
    baseURL: "http://localhost:8081",
  }));

  // 请求拦截
  vm.$u.http.interceptors.request.use(
    (config) => {
      // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
      config.data = config.data || {};
      // 根据custom参数中配置的是否需要token，添加对应的请求头
      if (config?.custom?.auth) {
        // 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
        config.header.token = vm.$store.state.user.token;
      }
      setReqLoading();
      return config;
    },
    (err) => Promise.reject(err)
  );

  // 请求错误的信息输出，方便直接控制台复制交给后端
  const requestLogger = (config, errMsg) => {
    let { fullPath, method, header, params, data } = config;
    header = JSON.stringify(header);
    method = method.toLowerCase();
    const body = JSON.stringify(method === "get" ? params : data);
    let debugInfo = "\n[request exception]\n";
    debugInfo += `url: ${fullPath}\n`;
    debugInfo += `method: ${method}\n`;
    debugInfo += `header: ${header}\n`;
    debugInfo += `body: ${body}\n`;
    debugInfo += `exception: ${errMsg}`;
    console.warn(debugInfo);
    // 如果没有显式定义custom(自定义参数)的toast参数为false的话
    const { custom } = config; // 就给予提示
    if (!custom || custom.toast !== false) vm.$u.toast(errMsg);
    return Promise.reject(errMsg); // 返回异常信息
  };

  // 响应拦截
  vm.$u.http.interceptors.response.use(
    (res) => {
      setReqLoading(false);
      const { config, data: resData } = res;
      const { code, data, message } = resData;
      if (code === 1) return data || null; // 假设接口的成功值为1, 则直接返回对应的信息
      return requestLogger(config, message);
    },
    (err) => {
      // 对响应错误做点什么(http状态码非200)
      setReqLoading(false);
      const { config, statusCode } = err;
      let errMsg;
      switch (statusCode) {
        case 301:
        case 302:
          errMsg = "重定向异常";
          break;
        case 400:
          errMsg = "请求语法错误";
          break;
        case 401:
          errMsg = "无访问权限";
          break;
        case 403:
          errMsg = "拒绝访问";
          break;
        case 404:
          errMsg = "请求地址有误";
          break;
        default:
          errMsg = "服务异常";
          break;
      }
      return requestLogger(config, errMsg);
    }
  );
};
