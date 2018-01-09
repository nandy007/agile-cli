#! node

//#!/usr/bin/env node

const program = require('commander'),
    path = require('path');
const chalk = require('chalk');

const packageJSON = require('./package.json');

function showConsole() {
    var arr = Array.prototype.slice.call(arguments, 0);
    arr.unshift('');
    arr.push('');
    console.log(arr.join('\n  '));
}

program
    .version(packageJSON.version);


program
    .command('ls')//声明命令叫ls
    .description('列出可以使用的模板')//给出这个命令的描述
    .action(function (options) {//命令的实现体
        var list = require('./libs/ls').getList();
        if(list.length===0){
            showConsole(chalk.red('没有可用的模板'));
        }else{
            var leftLineWidth = 24;
            var createBlank = function(len){
                var str = '';
                for(var i=0;i<len;i++){
                    str += ' ';
                }
                return str;
            };
            var rs = [chalk.yellow('name') + createBlank(leftLineWidth - 4) + '|'+createBlank(10)+chalk.yellow('desc')];
            for(var i=0, len=list.length;i<len;i++){
                var item = list[i];
                rs.push(item.id + createBlank(leftLineWidth - item.id.length)+'|'+createBlank(10)+item.name)
            }
            rs.push('\n可执行 agile-cli use <'+chalk.yellow('name')+'> 使用模板')
            showConsole.apply(null, rs);
        }
        
    });

program
    .command('use <name>')
    .description('使用模板创建项目')
    .option('-f, --force', '当目录不为空时是否强制创建')//设置这个命令的参数
    .action(function (name, options) {
        var ls = require('./libs/ls');
        var template = ls.getTemplate(name);

        if (!template) {
            showConsole('名称为 [ ' + chalk.red(name) + ' ] 的模板不存在！');
            return;
        }

        ls.createByTemplate(template, options.force, function (result) {
            if (result) {
                showConsole(chalk.red(result.msg));
            } else {
                showConsole('根据模板 [ ' + chalk.red(name) + ' ] 创建项目完毕', '请执行 ' + chalk.yellow('npm install') + ' 指令初始化项目', '项目根目录包含 ' + chalk.red('readme') + ' 文件，请认真阅读');
            }
        });

    });


program.parse(process.argv);//开始解析用户输入的命令
