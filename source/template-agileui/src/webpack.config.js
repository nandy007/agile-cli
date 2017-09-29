const webpack = require('webpack'),
    path = require('path');

const plugins = [];

if (process.argv[1].indexOf('webpack-dev-server')) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
    entry: __dirname + "/app/main.js", //入口文件
    output: {
        path: __dirname + "/public/build",
        //filename: "bundle-[hash].js"
        filename: "bundle.js",
        publicPath: "/build/",
    },
    devtool: 'none',
    devServer: {
        host: '0.0.0.0',
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true,
        port: 3000
    },
    module: {
        rules:  [
            {
                test: /\.aui$/,
                loader: "aui-loader"
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?name=fonts/[name][md5:hash:hex:7].[ext]',
            }
        ]
    },
    resolve: {
        alias: {
            
        }
    },
    plugins: plugins
};