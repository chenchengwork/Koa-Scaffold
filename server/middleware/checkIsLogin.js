/**
 * Created by chencheng on 17-7-20.
 */
const config = require('../vendor/Config');
const authConf = config.get('auth');

const checkIsLogin = () => async (ctx,next) => {
    //忽略验证的路由
    if(authConf.ignoreRoute.includes(ctx.path)){
        await next()
    }
    //验证是否登录
    else if(true){
        await next()
    }
}


module.exports = checkIsLogin;