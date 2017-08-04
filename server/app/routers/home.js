/**
 * 主页子路由
 */

const router = require('koa-router')();
const index = require('../controllers/index');

module.exports = router.get('/', index.homePage)
    .get('getHomeAPI', index.getHomeAPI)
    .post('postHomeAPI', index.postHomeAPI)
    .post('postJsonHomeAPI', index.postJsonHomeAPI)
    .post('postTextHomeAPI', index.postTextHomeAPI)
    .post('postUploadAPI', index.postUploadAPI)