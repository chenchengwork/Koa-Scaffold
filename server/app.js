'use strict'
const Koa = require('koa');

const config = require('./config');
const bootstrap = require('./bootstrap');

const app = new Koa();

/**
 * 初始化启动任务
 */
bootstrap.init(app);

app.listen(config.port);

console.log(`the server is start at port ${config.port}`);
