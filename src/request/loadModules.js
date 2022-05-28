function loadModules() {
  // 匹配modules文件夹及子文件夹下的js文件
  const context = require.context("./modules", true, /([a-z_]+)\.js$/i);
  // 获取所有api
  const modules = context.keys().reduce((prev, curr) => {
    return [...prev, ...context(curr).default];
  }, []);
  return { modules };
}

export default loadModules;
