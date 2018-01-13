'use strict'

const chalk = require('chalk')
const electron = require('electron')
const path = require('path')
const { say } = require('cfonts')
const { spawn } = require('child_process')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackHotMiddleware = require('webpack-hot-middleware')

const kill = require('tree-kill');

const rendererConfig = require('./webpack.renderer.config')
const mainConfig = require('./webpack.main.config')

const packager = require('../package.json');

process.env.NODE_ENV = 'development';

function logStats(proc, data) {
    let log = ''

    log += chalk.yellow.bold(`┏ ${proc} Process ${new Array((19 - proc.length) + 1).join('-')}`)
    log += '\n\n'

    if (typeof data === 'object') {
        data.toString({
            colors: true,
            chunks: false
        }).split(/\r?\n/).forEach(line => {
            log += '  ' + line + '\n'
        })
    } else {
        log += `  ${data}\n`
    }

    log += '\n' + chalk.yellow.bold(`┗ ${new Array(28 + 1).join('-')}`) + '\n'

    console.log(log)
}

function electronLog(data, color) {
    let log = ''
    data = data.toString().split(/\r?\n/)
    data.forEach(line => {
        log += `  ${line}\n`
    })
    if (/[0-9A-z]+/.test(log)) {
        console.log(
            chalk[color].bold('┏ Electron -------------------') +
            '\n\n' +
            log +
            chalk[color].bold('┗ ----------------------------') +
            '\n'
        )
    }
}


class Runner {
    constructor() {
        this.manualRestart = false;
    }

    createHotMiddleware(compiler) {
        this.hotMiddleware = webpackHotMiddleware(compiler, {
            log: false,
            heartbeat: 2500
        })
    }

    startRenderer() {
        return new Promise((resolve, reject) => {
            const rendererProcess = this.rendererProcess = spawn(process.platform === 'win32'?'npm.cmd':'npm', ['run', 'renderer'], {cwd: path.join(__dirname, '../')})

            let flag = false;

            rendererProcess.stdout.on('data', data => {
                logStats('Renderer', data.toString().trim())
                if(!flag && data.toString().indexOf('Compiled successfully')>-1){
                    flag = true;
                    resolve();
                }
            })
            rendererProcess.stderr.on('data', data => {
                
                logStats('Renderer', data.toString().trim())
            })

            rendererProcess.on('close', () => {
                if (!this.manualRestart) {
                    kill(rendererProcess.pid, function(err) {
                        process.exit('停止服务');
                    });
                }
            })
        })
    }

    startMain() {
        return new Promise((resolve, reject) => {

            const compiler = webpack(mainConfig)

            compiler.plugin('watch-run', (compilation, done) => {
                logStats('Main', chalk.white.bold('compiling...'))
                this.hotMiddleware.publish({ action: 'compiling' })
                done()
            })

            compiler.watch({}, (err, stats) => {
                if (err) {
                    console.log(err)
                    return
                }

                logStats('Main', stats)
                const electronProcess = this.electronProcess;
                if (electronProcess && electronProcess.kill) {
                    this.manualRestart = true
                    process.kill(electronProcess.pid)
                    this.electronProcess = null
                    this.startElectron()

                    setTimeout(() => {
                        this.manualRestart = false
                    }, 5000)
                }

                resolve()
            })
        })
    }

    startElectron() {
        const electronProcess = this.electronProcess = spawn(electron, ['--inspect=5858', path.join(__dirname, '../', packager.main)])

        electronProcess.stdout.on('data', data => {
            electronLog(data, 'blue')
        })
        electronProcess.stderr.on('data', data => {
            electronLog(data, 'red')
        })

        electronProcess.on('close', () => {
            this.rendererProcess.emit('close');
        })

    }
}

function greeting() {
    const cols = process.stdout.columns
    let text = ''

    if (cols > 130) text = 'electron-agile'
    else if (cols > 76) text = 'electron-|agile'
    else text = false

    if (text) {
        say(text, {
            colors: ['yellow'],
            font: 'simple3d',
            space: false
        })
    } else console.log(chalk.yellow.bold('\n  electron-agile'))
    console.log(chalk.blue('\n  getting ready...') + '\n')
}

function init() {
    greeting()

    const runner = new Runner();
    Promise.all([runner.startRenderer()/** 载入渲染进程监控 */, runner.startMain()/** 载入主进程监控 */])
        .then(() => {
            runner.startElectron()/** 启动electron客户端 */
        })
        .catch(err => {
            console.error(err)
        })
}

init()
