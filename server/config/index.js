/**
 * Created by chencheng on 17-7-19.
 */
const config = {

    port: 3001,             //服务监听端口
    consoleLog:true,        //控制台日志开关


    //db配置
    database: {
        TYPE:"mysql",
        DATABASE: 'koa_demo',
        USERNAME: 'root',
        PASSWORD: 'abc123',
        PORT: '3306',
        HOST: 'localhost'
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