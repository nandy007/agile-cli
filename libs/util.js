var fs = require('fs'), _p = require('path');

var copy = function (src, dst) {
    //读取目录
    var paths = fs.readdirSync(src);

    paths.forEach(function (path) {
        var _src = _p.join(src, path);
        var _dst = _p.join(dst, path);
        var st = fs.statSync(_src);

        if (st.isFile()) {
            fs.writeFileSync(_dst, fs.readFileSync(_src));
            /*readable = fs.createReadStream(_src);//创建读取流
            writable = fs.createWriteStream(_dst);//创建写入流
            readable.pipe(writable);*/
        } else if (st.isDirectory()) {
            exists(_src, _dst, copy);
        }
    });
}

var exists = function (src, dst, callback) {
    //测试某个路径下文件是否存在
    var exists = fs.existsSync(dst);

    if (exists) {
        callback(src, dst);
    } else {
        fs.mkdirSync(dst);
        callback(src, dst);
    }
}

var getQuestionInfo = function (questions, title) {
    var questionInfo;
    if (typeof title === 'object') {
        questionInfo = title;
        title = questionInfo.title;
    } else {
        questionInfo = questions[title];
    }

    questionInfo.title = title;

    process.stdout.write(questionInfo.question);
    process.stdin.resume();

    return questionInfo;
};

var initRepl = function (questions, first, func) {
    var result = {};

    var questionInfo = getQuestionInfo(questions, first);

    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', (chunk) => {

        process.stdin.pause();

        chunk = chunk.replace(/[\s\n]/, '').trim();

        var rs = questionInfo.handler(chunk);

        if (!rs.next) {
            result[questionInfo.title] = rs.content;
            func && func(rs.next === false ? true : false, result);
            process.exit();
            
        } else if (typeof rs.next === 'object') {
            questionInfo = getQuestionInfo(questions, rs.next);
        } else {
            result[questionInfo.title] = rs.content;
            questionInfo = getQuestionInfo(questions, rs.next);
        }

    });


};


module.exports = {
    exists: function (from, to) {
        exists(from, to, copy)
    },
    initRepl: initRepl
};