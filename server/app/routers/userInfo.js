/**
 * 主页子路由
 */

const router = require('koa-router')();
// const { postFormData, postText, postJson, postUrlencoded } = require('../middleware/postParse');

const userInfoController = require('../controllers/userInfoController');

module.exports = router.get('getUserInfo', userInfoController.getUserInfoAction)
    .get('getUserInfoById',userInfoController.getUserInfoByIdAction)
    .get('createUserInfo',userInfoController.createUserInfoAction)
    .get('updateUserInfo',userInfoController.updateUserInfoAction)
    .get('delUserInfo',userInfoController.delUserInfoAction)
