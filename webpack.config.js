const WorkboxWebpackPlugin = require("workbox-webpack-plugin")
const path = require('path')

module.exports = {
  mode: 'development',
  entry: [
    '@babel/polyfill', // enables async-await
    './app.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  plugins: [
    // new WorkboxWebpackPlugin.InjectManifest({
    //   swSrc: path.join(process.cwd(), './src-sw.js'),
    //   swDest: 'service-worker.js'
    // })
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
    })  
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // }
    ]
  }
}
