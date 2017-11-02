# agile-cli agile系列框架脚手架

使用的通用模块和框架地址：

## agile-ui

地址：[https://github.com/nandy007/agile-ui](https://github.com/nandy007/agile-ui "https://github.com/nandy007/agile-ui")

此框架用于定义aui组件，即支持任意形式的<aui-{componentName}>的dom元素创建，所有需要使用的aui组件必须按照aui规范来编写。aui组件具有完整的生命周期事件钩子（hook）。

## aui-loader

地址：[https://github.com/nandy007/aui-loader](https://github.com/nandy007/aui-loader "https://github.com/nandy007/aui-loader")

此框架用于加载符合aui规范的*.aui文件，可以用于webpack（集成和同步加载）和requirejs（异步加载）环境

## agile-vm

地址：[https://github.com/nandy007/agile-vm](https://github.com/nandy007/agile-vm "https://github.com/nandy007/agile-vm")

此框架提供jquery规范的mvvm使用。大部分情况对dom的操作应该基于json数据的操作，而不应该使用jquery的$操作，即应该尽量避免直接使用jquery操作dom。


## aui-component

地址：[https://github.com/nandy007/aui-component](https://github.com/nandy007/aui-component "https://github.com/nandy007/aui-component")

此框架内包含部分相对成熟的aui组件。

在webpack中使用需先执行 npm install @auicomponents/{componentName}

在requirejs中使用按照此脚手架自动创建aui-amd模板即可


使用框架可以快速搭建组件化+mvvm的web前端代码工程

## chestnut-app

地址：[https://github.com/nandy007/chestnut-app](https://github.com/nandy007/chestnut-app "https://github.com/nandy007/chestnut-app")

此框架是基于nodejs的服务器框架，脚手架中主要用于搭建静态服务器环境


# 指令


## ls指令

ls指令用于列出目前可用于创建项目工程的模板，如下：

```bash

    agile-cli ls

```

显示结果以 **name:description** 形式展现，每个模板信息占一行


## use [options] <name>指令

use指令用于通过模板名称来创建项目

其中：

options仅有一项，即-f|--force，不存在时会检测项目目录是否为空，空则拒绝；当存在时忽略项目目录内容强制覆盖生成项目

name为项目名称，即ls指令显示的内容中冒号之前的部分

比如：

```javascript

	agile-cli use agileui

```


# 用法

准备工作：先使用npm install -g agile-cli，安装好之后agile-cli即可作为系统命令使用。

第一步：使用ls指令查看当前支持的模板

第二步：使用use指令创建项目

第三步：使用npm install指令初始化项目

第四步：启动开发模式，执行指令 npm run start

第五步：编码，主要在app目录内完成，public目录可以操作一些静态资源

第六步：打包，npm pack


使用模板创建后的项目内都有一个readme文件，内含目录结构说明，请仔细阅读


# 通用模板说明


## agileui模板

此模板使用agile-ui、agile-vm、aui-component、aui-loader框架

按照上面的《用法》创建项目后，执行 npm run start 即可启动。

访问：http:127.0.0.1:3000 即可查看效果。如需修改端口请在webpack.config.js文件操作。

模板使用webpack搭建了hello world的界面，可根据实际开发需要完善代码

如需打包可执行 npm run pack ，会在public/build目录生成一个bundle.js文件，拷贝到实际项目中使用即可


## aui-amd模板

此模板使用agile-ui、agile-vm、aui-component、aui-loader框架

按照上面《用法》创建项目后，可执行 npm run server 或者 node app.js 即可启动

访问：http:127.0.0.1:3001 即可查看效果。如需修改端口请在config.js文件操作。

模板是一个requirejs搭建的aui-component的一个演示效果，可根据实际开发需求完善代码

开发的代码可直接拷贝到实际的服务器使用即可，无须打包。

