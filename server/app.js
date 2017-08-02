'use strict';
const Koa = require('koa');

const config = require('./vendor/Config');
const bootstrap = require('./app/bootstrap');

const app = new Koa();
const appConf = config.get('app');
/**
 * 初始化启动任务
 */
bootstrap.init(app);

app.listen(appConf.port);

console.log(`the server is start at port ${appConf.port}`);
