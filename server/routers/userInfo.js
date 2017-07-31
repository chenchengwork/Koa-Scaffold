/**
 * 主页子路由
 */

const router = require('koa-router')();
const { postFormData, postText, postJson, postUrlencoded } = require('../middleware/postParse');

const userInfo = require('../controllers/userInfo');

module.exports = router.get('getUserInfo', userInfo.getUserInfo)
    .get('getUserInfoById',userInfo.getUserInfoById)
