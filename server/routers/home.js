/**
 * 主页子路由
 */
const busboy = require('koa-busboy');
const { uuid } = require('os');
const path = require('path');
const realPath = path.join(
    __dirname,
    '/../static/upload/'
);
console.log(realPath);
const uploader = busboy({
    dest: realPath, // default is system temp folder (`os.tmpdir()`)
    fnDestFilename: (fieldname, filename) => {

        return 11 + filename
    }
})

const router = require('koa-router')();
const index = require('../controllers/index');

module.exports = router.get('homePage', index.homePage)
    .get('getHomeAPI',index.getHomeAPI)
    .post('postHomeAPI',index.postHomeAPI)
    .post('homeDisposeUpload', uploader,index.homeDisposeUpload);
