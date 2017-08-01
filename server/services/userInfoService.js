/**
 * Created by chencheng on 17-7-31.
 */

const userInfoModel = require('../models/userInfoModel');

exports.getUserInfo = async () => {
    let userInfo = await userInfoModel.findAll();

    return userInfo;
}

exports.getUserInfoById = async (userId) => {
    return await userInfoModel.findById(userId);
}


exports.createUserInfo = async () => {
    return await userInfoModel.create({
        userName:"test1",
        userEmail:"test1@tianjishuju.com",
        createTime:parseInt(Date.now()/1000),
        updateTime:parseInt(Date.now()/1000),
    })
};


exports.updateUserInfo = async () => {
    return await userInfoModel.update({userName:"test2"},{
        where:{
            userId:{
                $gt:3
            }
        }
    })
}


exports.delUserInfo = async () => {

    return userInfoModel.destroy({
        where:{
            userId:4
        }
    })
}

