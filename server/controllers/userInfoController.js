/**
 * Created by chencheng on 17-7-31.
 */
const restServer = require('../utils/restServer');
const userInfoService = require('../services/userInfoService');

/**
 * 获取全部userInfo信息
 * @param ctx
 * @returns {Promise.<void>}
 */
exports.getUserInfoAction = async (ctx) => {
    let userInfo = await userInfoService.getUserInfo();

    restServer.success(ctx,userInfo);
};


/**
 * 依据userId获取用户信息
 * @param ctx
 * @returns {Promise.<void>}
 */
exports.getUserInfoByIdAction = async (ctx) => {
    let userInfo = await userInfoService.getUserInfoById(1);

    restServer.success(ctx,userInfo);
}


exports.createUserInfoAction = async (ctx) => {

    let res = await userInfoService.createUserInfo();
    restServer.success(ctx,res)
}


exports.updateUserInfoAction = async (ctx) => {
    let res = await userInfoService.updateUserInfo();

    restServer.success(ctx,res);
}


exports.delUserInfoAction = async (ctx) => {
    let res = await userInfoService.delUserInfo();

    restServer.success(ctx,res);
}