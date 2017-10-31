const path = require('path');

module.exports = {
  port: 3001,
  rootPath: path.join(__dirname),
  // 此处没配置sessionConfig使用默认存储，但是建议配置，请事先准备一个mysql数据库
  middleware: {
    staticPath: path.join(__dirname, 'public')
  }

};