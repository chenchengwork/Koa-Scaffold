'use strict'
const path = require('path');
const Koa = require('koa');
const koaLogger = require('koa-logger');
const views = require('koa-views')


const config = require('./config');
const logger = require('./utils/logger');
const routers = require('./routers');

const app = new Koa();

// session存储配置

// 配置session中间件

// 配置控制台日志中间件
config.consoleLog && app.use(koaLogger());


// 配置ctx.body解析中间件

// 配置静态资源加载中间件



// 配置服务端模板渲染引擎中间件
// app.use(views(path.join(__dirname, './views'), {
//     extension: 'ejs'
// }));

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())


// 监听启动端口

app.use(function *(){
    console.log(2222)
    this.body = 'Hello World';
});

app.listen(config.port);


console.log(`the server is start at port ${config.port}`);
