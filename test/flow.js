var ls = require('../libs/ls'), path = require('path');

ls.createByTemplate(ls.getTemplate('aui-amd'), true, function(rs){
    console.log(rs);
});