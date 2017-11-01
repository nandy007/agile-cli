#! node

//#!/usr/bin/env node

var program = require('commander'),
    path = require('path');

var packageJSON = require('./package.json');

function showConsole() {
    var arr = Array.prototype.slice.call(arguments, 0);
    arr.unshift('');
    arr.push('');
    console.log(arr.join('\n'));
}

program
    .version(packageJSON.version);

program
    .command('ls')//声明命令叫ls
    .description('列出可以使用的模板')//给出这个命令的描述
    .action(function (options) {//命令的实现体
        var ls = require('./libs/ls');
        showConsole(ls.getList() || '没有可用的模板');
    });

program
    .command('use <name>')
    .description('使用模板创建项目')
    .option('-f, --force', '当目录不为空时是否强制创建')//设置这个命令的参数
    .action(function (name, options) {
        var ls = require('./libs/ls');
        var template = ls.getTemplate(name);

        if (!template) {
            showConsole('名称为 [ ' + name + ' ] 的模板不存在！');
            return;
        }

        ls.createByTemplate(template, options.force, function (result) {
            if (result) {
                showConsole(result.msg);
            } else {
                showConsole('根据模板 [ ' + name + ' ] 创建项目完毕', '请执行npm install指令初始化项目', '项目根目录包含readme文件，请认真阅读');
            }
        });

    });

program.parse(process.argv);//开始解析用户输入的命令