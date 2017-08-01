/**
 * Created by chencheng on 17-7-31.
 */

const userInfoModel = require('../models/userInfoModel');
const DB = require('../utils/DB');

exports.getUserInfo = async () => {
    return await userInfoModel.findAndCountAll({
        where:{
            createdAt:{
				$lt: new Date(),
				$gt: new Date(new Date() - 24 * 60 * 60 * 1000)
            }
        },
        offset:0,
        limit:2,
        raw:true
    }).then(res => {
        console.log(res);
    });
}

exports.getUserInfoById = async (userId) => {
    return await userInfoModel.findById(userId);
}


exports.createUserInfo = async () => {

    return await DB.transaction(async (t) => {
		await userInfoModel.create({
			userName:"test1",
			userEmail:"test1@tianjishuju.com",
			createTime:Date.now(),
			updateTime:Date.now(),
		},{transaction: t});

		await userInfoModel.create({
			userName:"test2",
			userEmail:"test2@tianjishuju.com",
			createTime:Date.now(),
			updateTime:Date.now(),
		},{transaction: t})
    });
};


exports.updateUserInfo = async () => {
    return await userInfoModel.update({userName:"test2"},{
        where:{
            userId:6
        }
    })
}


exports.delUserInfo = async () => {

    return userInfoModel.destroy({
        where:{
            userId:6
        }
    })
}

