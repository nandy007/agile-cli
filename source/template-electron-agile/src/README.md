

electron原版包国内比较难下载，建议使用 cnpm install

# 目录说明


## src目录

src为源码目录


### src/main目录

为electron主进程交互代码


### src/renderer目录

为electron渲染进程交互代码，采用agile-ui框架搭建


## dist目录

dist目录webpack编译打包后的目标文件目录


### dist/electron目录

用于electron程序构建的目录


### dist/web目录

用于在浏览器的访问的程序目录，可直接拷贝至任意web容器中运行


## .agile目录

用于webpack打包和electron程序构建的配置文件目录，实际运行请看package.json的scripts指令


### 用于web开发

请看配置文件webpack.web.config.js文件

命令执行：

```bash

npm run web

```


### 用于electron程序开发

*webpack.renderer.config.js* 用于打包electron程序的渲染进程开发

*webpack.main.config.js* 用于打包electron程序的主进程开发

*dev-runner.js* 为electron程序开发的入口文件

*dev-client.js* 配合dev-runner.js进行热更新处理

命令执行：

```bash

npm run electron


```


### 打包生产环境

*build.js* 用于打包成产环境的electron

打包需要的工具请看**build-tools**目录。

命令执行：

```bash

npm run build


```

执行后同时会生成web程序，但是不可直接使用，需要使用web程序请执行：

```bash

npm run pack:web


```


## build-tools目录

打包需要的工具


### build-tools/environment目录

打包需要依赖的环境，请看内部的readme文件，执行打包命令报错再看即可


### build-tools/icons目录

程序的图标，在package.json文件中配置，请自行修改


### build-tools/builds目录

打包后的可执行文件所在目录


# electron开发步骤

## 第一步：安装

执行：

```bash

npm install

```

## 第二步：开发

在src/main和src/renderer目录下编写适当的代码


## 第三步：运行和调试

执行:

```bash

npm run electron

```


## 第四步：打包

执行：

```bash

npm run build

```

在build-tools/build目录下即生成可执行文件
