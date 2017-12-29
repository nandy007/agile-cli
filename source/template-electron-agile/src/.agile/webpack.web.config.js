/* eslint strict: 0 */
'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    // 定义renderer渲染进程
    renderer: [path.join(__dirname, '../src/renderer/renderer.js')]
  },
  output: {
    path: path.join(__dirname, '../dist/web/assets'),
    publicPath: '/assets/',
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.aui$/,
        loader: "aui-loader"
      },
      {
        test: /\.less$/,
        //loader: 'style-loader!css-loader!less-loader'
        use: ExtractTextPlugin.extract({ use: ["css-loader", "less-loader"], fallback: 'style-loader' }),
      },
      {
        test: /\.css$/,
        //loader: 'style-loader!css-loader'
        use: ExtractTextPlugin.extract({ use: ["css-loader"], fallback: 'style-loader' })
      },
      {
        test: /\.(png|jpg|gif)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1,
            name: 'images/[name].[ext]'
          }
        }]
      },
      {
        // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?name=fonts/[name][md5:hash:hex:7].[ext]',
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, '../dist/web'), //本地服务器所加载的页面所在的目录
    port: 3000
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css')
  ]
};