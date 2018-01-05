const webpack = require('webpack'),
    path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [
    new ExtractTextPlugin('css/[name].css')
];

if (process.env.NODE_ENV === 'development') {

    plugins.push(new webpack.HotModuleReplacementPlugin());

}else{
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }));
}

module.exports = {
    entry: {
        main: [__dirname + "/app/main.js"]
    }, //入口文件
    output: {
        path: __dirname + "/public/build",
        filename: "js/[name].js",
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
        rules: [
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
                test: /\.less$/,
                //loader: 'style-loader!css-loader!less-loader'
                use: ExtractTextPlugin.extract({ use: ["css-loader", "postcss-loader", "less-loader"], fallback: 'style-loader' }),
              },
            {
                test: /\.css$/,
                //loader: 'style-loader!css-loader!postcss-loader'
                use: ExtractTextPlugin.extract({ use: ["css-loader", "postcss-loader"], fallback: 'style-loader' })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'images/[name].[ext]'
                    }
                }]
            },
            {
                // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'fonts/[name].[ext]'
                    }
                }]
            }
        ]
    },
    resolve: {
        alias: {

        }
    },
    plugins: plugins
};