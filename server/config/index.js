/**
 * Created by chencheng on 17-7-19.
 */
const config = {

    port: 3001,             //服务监听端口
    consoleLog:false,        //控制台日志开关

    database: {
        DATABASE: 'koa_demo',
        USERNAME: 'root',
        PASSWORD: 'abc123',
        PORT: '3306',
        HOST: 'localhost'
    }
}

module.exports = config;