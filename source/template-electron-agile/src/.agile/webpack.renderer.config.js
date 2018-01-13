/* eslint strict: 0 */
'use strict';

process.env.RUN_TARGET = 'electron-renderer';

const webpack = require('webpack');
const path = require('path');


const webConfig = require('./webpack.web.config');

const rendererConfig = webConfig;

module.exports = rendererConfig;