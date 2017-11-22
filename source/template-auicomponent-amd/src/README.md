# aui-amd模板说明

此模板默认包含：chestnut-app、agile-ui、agile-ce和aui-component框架用于组件化的mvvm模式开发。

其中chestnut-app为koa2框架封装，其他为html前端框架

前端以requirejs为模块引入方式，要求符合amd规范

## 目录结构说明

app.js :chestnut-app启动文件

config.js : 配置文件，其中port为启动端口，如有冲突请自行修改

postinstall.js : install命令后的处理，此操作会把agile-ce、agile-ui、agile-component等模块的浏览器依赖资源拷贝到指定目录

public/index.html : 首页地址，引入了require.js和main.js入口文件

public/assets : 所有资源目录

public/@auicomponents : aui组件目录

public/components : 开发时编写的组件所在目录

public/page : 开发时页面级的组件所在目录

public/frameworks : 所有用到框架的所在目录

如果修改requirejs配置请到 public/js/main.js中修改


