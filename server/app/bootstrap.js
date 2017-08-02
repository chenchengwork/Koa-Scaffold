/**
 * Created by chencheng on 17-7-20.
 */

'use strict';
const path = require('path');
const momentTimezone = require('moment-timezone');
const koaLogger = require('koa-logger');
const views = require('koa-views');
const koaStatic = require('koa-static');

const logger = require('../vendor/Logger');
const helpers = require('../vendor/Helpers');
const config = require('../vendor/Config');
const routers = require('./routers/index');

const appConf = config.get('app.timezone');
const checkIsLogin = require('../middleware/checkIsLogin');

module.exports = {
    init(app){

        //设置时区
        momentTimezone.tz.setDefault(appConf.timezone);

        /**
         * 拦截并自定义系统错误
         */
        app.on('error', function (err, ctx) {
            logger.error(err);
            console.error('server error', err);
        });


        //session存储配置


        //配置session中间件


        //配置控制台日志
        app.use(koaLogger());

        //验证是否登录
        //config.auth.checkIsLogin && app.use(checkIsLogin());

        //配置ctx.body解析

        //配置静态资源加载
        app.use(koaStatic(
            helpers.publicPath()
        ));

        //配置服务端模板渲染引擎
        app.use(views(path.join(__dirname, './views'), {
            extension: 'ejs'
        }));


        //初始化路由中间件
        app.use(routers.routes()).use(routers.allowedMethods());
    }
};