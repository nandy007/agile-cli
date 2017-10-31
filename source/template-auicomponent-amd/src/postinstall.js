
var path = require('path'), fs = require('fs');

var files = [
    {
        src: path.join(__dirname, './node_modules/agile-vm/dist/agile.vm.browser.js'),
        target: path.join(__dirname, './public/assets/frameworks/agile/agile.vm.browser.js')
    },
    {
        src: path.join(__dirname, './node_modules/agile-ui/dist/agile.ui.js'),
        target: path.join(__dirname, './public/assets/frameworks/agile/agile.ui.js')
    },
    {
        src: path.join(__dirname, './node_modules/aui-loader/dist/aui.js'),
        target: path.join(__dirname, './public/assets/frameworks/agile/aui.js')
    },
    {
        src: path.join(__dirname, './node_modules/aui-component/@auicomponents'),
        target: path.join(__dirname, './public/assets/@auicomponents')
    }
];

var util = require('agile-cli/libs/util');

files.forEach(function(item){
    if(item.src.split('.').pop()==='js'){
        var readable = fs.createReadStream(item.src);//创建读取流
        var writable = fs.createWriteStream(item.target, {flag: 'a'});//创建写入流
        readable.pipe(writable);
    }else{
        util.exists(item.src, item.target);
    }
    
});

