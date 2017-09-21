# agile-cli agile系列框架脚手架

主要包括：

agile ui框架：https://github.com/nandy007/agile-ui

agile-vm框架：https://github.com/nandy007/agile-vm

aui-component框架：https://github.com/nandy007/aui-component


使用框架可以快速搭建组件化+mvvm的web前端代码工程


# 指令


## ls指令

ls指令用于列出目前可用于创建项目工程的模板，如下：

    agile-cli ls

显示结果以 name:description 形式展现，每个模板信息占一行


## use [options] <name>指令

use指令用于通过模板名称来创建项目

其中：

options仅有一项，即-f|--force，不存在时会检测项目目录是否为空，空则拒绝；当存在时忽略项目目录内容强制覆盖生成项目

name为项目名称，即ls指令显示的内容中冒号之前的部分


# 用法

第一步：使用ls指令查看当前支持的模板

第二步：使用use指令创建项目

第三步：使用npm install指令初始化项目

第四步：开始编码


使用模板创建后的项目内都有一个readme文件，内含目录结构说明，请仔细阅读

