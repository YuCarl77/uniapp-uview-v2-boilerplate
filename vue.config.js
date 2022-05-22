const TransformPages = require("uni-read-pages");
const { webpack, routes } = new TransformPages({
  includes: ["name", "meta", "path", "aliasPath"],
});

module.exports = {
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
