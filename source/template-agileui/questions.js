var questions = {
    "package": {
        "question": "是否生成package.json文件?(y/n) ",
        "default": "y",
        "handler": function (input) {
            input = input.toLowerCase();
            if(input==='y'){
                return {
                    next: "description",
                    content: true
                };
            }else if(input==='n'){
                return {
                    next: null,
                    content: false
                };
            }else{
                console.log('您输入的命令是： ' + input);
                return {
                    next: {
                        title: 'package',
                        question: '请输入正确指令：(y/n) ',
                        handler: questions.package.handler
                    }
                };
            }
        }
    },
    "description": {
        "question": "请输入项目描述： ",
        "handler": function (input) {
            return {
                next: "author",
                content: input
            };
        }
    },
    "author": {
        "question": "请输入作者名称： ",
        "handler": function (input) {
            return {
                next: null,
                content: input
            };
        }
    }
};

module.exports = questions;