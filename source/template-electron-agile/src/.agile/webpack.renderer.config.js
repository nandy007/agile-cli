/* eslint strict: 0 */
'use strict';

const webpack = require('webpack');
const path = require('path');

const webConfig = require('./webpack.web.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rendererConfig = Object.create(webConfig);

rendererConfig.target = 'electron-renderer';

if (process.env.NODE_ENV === 'production') {
    rendererConfig.plugins.push(
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '../dist/web'),
                to: path.join(__dirname, '../dist/electron/static'),
                ignore: ['.*']
            }
        ]),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    );
} else {
    rendererConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());
}

module.exports = rendererConfig;