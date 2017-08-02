/**
 * 整合所有子路由
 */

const router = require('koa-router')();

const home = require('./home');
const userInfo = require('./userInfo');

router.use('/', home.routes(), home.allowedMethods());
router.use('/userInfo/', userInfo.routes(), userInfo.allowedMethods());

module.exports = router;


