const TransformPages = require("uni-read-pages");
const { webpack, routes } = new TransformPages({
  includes: ["name", "meta", "path", "aliasPath"],
});

module.exports = {
  transpileDependencies: ["uview-ui"],
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        ROUTES: webpack.DefinePlugin.runtimeValue(
          () => JSON.stringify(routes),
          true
        ),
      }),
    ],
  },
};
