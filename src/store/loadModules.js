function loadModules() {
  // 匹配modules文件夹下一层的模块名，不处理子文件夹，如果有子模块应当放在一级模块下的modules
  const context = require.context("./modules", false, /([a-z_]+)\.js$/i);
  // 获取匹配到的相对路径的文件名带后缀数组 例./user.js
  const fileNameArr = context.keys();
  // 加工一下匹配到的文件名数组为一个对象数组
  const fileNameMap = fileNameArr.map((key) => ({
    key, // key: ./user.js
    name: key.match(/([a-z_]+)\.js$/i)[1], // name: user
  }));
  // 循环遍历对象数组，读取每一个模块export default下的内容，生成最终的模块
  const modules = fileNameMap.reduce(
    // ({}) -> 相当于return {}
    (modules, { key, name }) => ({
      // 展开语法合并
      ...modules,
      // 动态遍历的属性名name如user:{state:() => ({})}，并且一级的模块默认开启了命名空间
      [name]: { namespaced: true, ...context(key).default },
    }),
    {}
  );
  return { context, modules };
}

export default loadModules;
