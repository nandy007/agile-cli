const chalk = require('chalk');

const fs = require('fs'), _p = require('path');

const copy = function (src, dst) {
    //读取目录
    const paths = fs.readdirSync(src);

    paths.forEach(function (path) {
        const _src = _p.join(src, path);
        const _dst = _p.join(dst, path);
        const st = fs.statSync(_src);

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

const exists = function (src, dst, callback) {
    //测试某个路径下文件是否存在
    const exists = fs.existsSync(dst);

    if (exists) {
        callback(src, dst);
    } else {
        fs.mkdirSync(dst);
        callback(src, dst);
    }
}


const toPath = _p.join(__dirname, '../dist/electron/static');
const fromPath = _p.join(__dirname, '../dist/web');
fs.mkdirSync(toPath);

exists(fromPath, toPath, copy);

console.log(chalk.yellow('  拷贝web源码到electron目录完毕'));
