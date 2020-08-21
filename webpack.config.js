const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = env => {
  const mode = env.mode ? env.mode : "production";

  return {
    mode,
    entry: {
      main: "./index.js"
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, "public")
    },
    plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: { collapseWhitespace: true, removeComments: true },
      inject: false
    })
    , new WorkboxWebpackPlugin.InjectManifest({
      swSrc: "./src-sw.js",
      swDest: "sw.js"
    })

    ],
    devtool: "source-map"
  };
};


// filename: "[name].[chunkhash].js",
// chunkFilename: "[name].[chunkhash].bundle.js",