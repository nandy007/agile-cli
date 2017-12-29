var glob = require('glob'),
    path = require('path'),
    fs = require('fs');


var arr = [], templates = {};

var files = glob.sync('./source/*/template.json', { cwd: path.join(__dirname, '../') });
files.forEach(function (file) {
    var template = require('.' + file);
    arr.push({id:template.id, name:template.name});
    templates[template.id] = template;
});

module.exports = {
    getList: function () {
        return arr;
    },
    getTemplate: function (id) {
        return templates[id];
    },
    createByTemplate: function (template, isForce, cb) {
        var util = require('./util');

        var projectPath = process.cwd();

        var templatePath = path.join(__dirname, '../', template.path);

        if (!isForce && fs.readdirSync(projectPath).length > 0) {
            return cb({
                msg: '当前目录不是一个空目录'
            });
        }

        // 执行用户交互
        if (template.firstQuestion) {
            var questionsPath = path.join(templatePath, 'questions');
            var questions = require(questionsPath);
            util.initRepl(questions, template.firstQuestion, function (err, result) {
                
                if(err) return cb({msg:'创建工程失败'});
                // 拷贝模板内容到当前文件夹
                util.exists(path.join(templatePath, 'src'), projectPath);
  
                // 生成定制的package文件
                if (result['package']) {
                    result.projectName = projectPath.split(/[\/\\]/g).pop();
                    var packageContent = fs.readFileSync(path.join(templatePath, 'package.json.tmpl'), 'utf-8');
                    for(var k in result){
                        packageContent = packageContent.replace('{{'+k+'}}', result[k]);
                    }
                    fs.writeFileSync(path.join(projectPath, 'package.json'), packageContent);
                }
                cb();
            });
        }
    }
}