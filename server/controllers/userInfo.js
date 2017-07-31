/**
 * Created by chencheng on 17-7-31.
 */
const restServer = require('../utils/restServer');
const userInfoService = require('../services/userInfoService');
exports.getUserInfo = async (ctx) => {
    let userInfo = await userInfoService.getUserInfo();

    restServer.success(ctx,userInfo);
}

exports.getUserInfoById = async (ctx) => {
    let userInfo = await userInfoService.getUserInfoById(1);

    restServer.success(ctx,userInfo);
}
