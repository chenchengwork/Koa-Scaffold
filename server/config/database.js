/**
 * Created by chencheng on 17-8-2.
 */

module.exports = {
    //当前的driver配置，与drivers中的key一致
    driver:"MySQL",
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

}