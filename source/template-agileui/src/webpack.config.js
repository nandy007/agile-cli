const webpack = require('webpack'),
    path = require('path');

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
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.aui$/,
                use: {
                    loader: "aui-loader"
                }
            },
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: {
            
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};