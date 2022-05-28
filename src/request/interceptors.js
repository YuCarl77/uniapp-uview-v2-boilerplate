// 此vm参数为页面的实例，可以通过它引用vuex中的变量
export default (vm) => {
  // 初始化请求配置
  vm.$u.http.setConfig((config) => ({
    ...config,
    baseURL: "http://localhost:8080",
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
      return config;
    },
    (err) => Promise.reject(err)
  );

  // 请求错误的信息输出，方便直接控制台复制交给后端
  const requestLogger = (config, err) => {
    let { fullPath, method, header, params, data } = config;
    header = JSON.stringify(header);
    method = method.toLowerCase();
    const body = JSON.stringify(method === "get" ? params : data);
    let debugInfo = "[request exception]\n";
    debugInfo += `url: ${fullPath}\n`;
    debugInfo += `method: ${method}\n`;
    debugInfo += `header: ${header}\n`;
    debugInfo += `body: ${body}\n`;
    debugInfo += `exception: ${err}`;
    console.log(debugInfo);
  };

  // 响应拦截
  vm.$u.http.interceptors.response.use(
    (res) => {
      const { config, data: resData } = res;
      const { code, data, message } = resData;
      if (code === 1) return data || null; // 假设接口的成功值为1, 则直接返回对应的信息
      const { custom } = config; // 自定义参数
      requestLogger(config, message);
      // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
      if (custom?.toast !== false) vm.$u.toast(message);
      return Promise.reject(message); // 返回异常信息
    },
    (err) => {
      // 对响应错误做点什么(http状态码非200)
      const { config, errMsg } = err;
      requestLogger(config, errMsg);
      return Promise.reject(errMsg);
    }
  );
};
