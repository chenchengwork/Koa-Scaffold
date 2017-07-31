/**
 * Created by chencheng on 17-7-31.
 */

const userInfoModel = require('../models/userInfoModel');

exports.getUserInfo = async () => {
    let userInfo = await userInfoModel.findAll().then((userInfo) => {

        return userInfo.map(v => v.dataValues);
    });

    return userInfo;
}

exports.getUserInfoById = async (userId) => {
    return await userInfoModel.findById(userId).then((userInfo) => {
        console.log(userInfo.dataValues)
    })
}