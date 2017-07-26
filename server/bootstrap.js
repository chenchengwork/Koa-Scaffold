/**
 * Created by chencheng on 17-7-20.
 */

'use strict';
const path = require('path');
const koaLogger = require('koa-logger');
const views = require('koa-views');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');

const config = require('./config');
const logger = require('./utils/logger');
const routers = require('./routers');

const checkIsLogin = require('./middleware/checkIsLogin');


module.exports = {
    init(app){
        /**
         * 拦截并自定义系统错误
         */
        app.on('error', function (err, ctx) {
            logger.error(err);
            console.log('server error', err);
        });

        //session存储配置


        //配置session中间件


        //配置控制台日志
        config.consoleLog && app.use(koaLogger());

        //验证是否登录
        config.auth.checkIsLogin && app.use(checkIsLogin());

        //配置ctx.body解析

        //配置静态资源加载
        app.use(koaStatic(
            path.join(__dirname, './static')
        ));

        //配置服务端模板渲染引擎
        app.use(views(path.join(__dirname, './views'), {
            extension: 'ejs'
        }));


        //初始化路由中间件
        app.use(routers.routes()).use(routers.allowedMethods());

    }
};