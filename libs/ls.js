var glob = require('glob'), 
    path = require('path'),
    fs = require('fs');


var arr = [], templates = {};

var files = glob.sync('./source/*/template.json', { cwd: path.join(__dirname, '../') });
files.forEach(function (file) {
    var template = require('.' + file);
    arr.push(template.id + ':' + template.name);
    templates[template.id] = template;
});

module.exports = {
    getList: function () {
        return arr.join('\n');
    },
    getTemplate: function (id) {
        return templates[id];
    },
    createByTemplate: function (template, isForce) {
        var util = require('./util');

        var projectPath = process.cwd();

        var templatePath = path.join(__dirname, '../', template.path);

        if(!isForce && fs.readdirSync(projectPath).length>0){
            return {
                msg: '当前目录不是一个空目录'
            }
        }

        // 拷贝模板内容到当前文件夹
        util.exists(path.join(templatePath, 'src'), projectPath);

        // 生成定制的package文件
        var projectName = projectPath.split(/[\/\\]/g).pop();

        var packageContent = fs.readFileSync(path.join(templatePath, 'package.json.tmpl'), 'utf-8');

        packageContent = packageContent.replace('{{projectName}}', projectName);

        fs.writeFileSync(path.join(projectPath, 'package.json'), packageContent);
    }
}