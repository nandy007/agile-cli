var util = require('../libs/util'), path = require('path');

var src = path.join(__dirname, '../source/template-agileui/src');
var dst = path.join(__dirname, '../../test');
console.log(111);
util.exists(src, dst);
console.log(222);