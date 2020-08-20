// const WorkboxWebpackPlugin = require("workbox-webpack-plugin")
// const path = require('path')

// module.exports = {
//   mode: 'development',
//   entry: [
//     '@babel/polyfill', // enables async-await
//     './index.html'
//   ],
//   output: {
//     path: __dirname,
//     filename: './public/bundle.js'
//   },
//   resolve: {
//     extensions: ['.js', '.jsx']
//   },
//   devtool: 'source-map',
//   watchOptions: {
//     ignored: /node_modules/
//   },
//   plugins: [
//     new WorkboxWebpackPlugin.InjectManifest({
//       swSrc: path.join(process.cwd(), './src-sw.js'),
//       swDest: 'service-worker.js'
//     })
//     // new WorkboxWebpackPlugin.GenerateSW({
//     //   swDest: 'sw.js',
//     //   clientsClaim: true,
//     //   skipWaiting: true,
//     // })  
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader'
//       }
//       // {
//       //   test: /\.css$/,
//       //   use: ['style-loader', 'css-loader']
//       // }
//     ]
//   }
// }


const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = env => {

  return {
    mode: 'development',
    entry: {
      main: "./src/index.js"
    },
    output: {
      filename: "[name].[chunkhash].js",
      chunkFilename: "[name].[chunkhash].bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: { collapseWhitespace: true, removeComments: true },
      inject: false
    })
    , new WorkboxWebpackPlugin.InjectManifest({
      swSrc: "./src/src-sw.js",
      swDest: "sw.js"
    })

    ],
    devtool: "source-map"
  };
};