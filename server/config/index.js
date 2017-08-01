/**
 * Created by chencheng on 17-7-19.
 */
const config = {
    debug:true,

    port: 3001,             //服务监听端口
    consoleLog:true,        //控制台日志开关


    //db配置
    database: {
        driver:"MySQL",     //当前的driver配置，与drivers中的key一致
        pool:{
            max: 5,
            min: 0,
            idle: 10000
        },
        drivers:{
            MySQL: {
                driver: 'mysql',
                host:'localhost',
                database: 'koa-demo',
                username: 'root',
                password: '123456',
                port: '3306',
            },

            /*Postgres:{
                 driver: 'postgres',
                 host:'localhost',
                 database: 'koa-demo',
                 username: 'root',
                 password: '123456',
                 port: '3306',
             }*/
        }

    },

    //认证配置
    auth:{
        checkIsLogin:true,      //是否开启登录认证

        //不需要认证的路由
        ignoreRoute:[
            '/'
        ],
    },

    //cache 配置



}

module.exports = config;