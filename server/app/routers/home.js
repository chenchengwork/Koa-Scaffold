/**
 * 主页子路由
 */

const router = require('koa-router')();
// const { postFormData, postText, postJson, postUrlencoded } = require('../../middleware/postParse');

const index = require('../controllers/index');

module.exports = router.get('homePage', index.homePage)
    .get('getHomeAPI', index.getHomeAPI)
    .post('postHomeAPI', index.postHomeAPI)
    .post('postJsonHomeAPI', index.postJsonHomeAPI)
    .post('postTextHomeAPI', index.postTextHomeAPI)
    .post('homeDisposeUpload', index.homeDisposeUpload)
// .post('postHomeAPI',postUrlencoded, index.postHomeAPI)
// .post('postJsonHomeAPI', postJson,index.postJsonHomeAPI)
// .post('postTextHomeAPI', postText, index.postTextHomeAPI)
// .post('homeDisposeUpload', postFormData, index.homeDisposeUpload);