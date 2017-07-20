const path = require('path');

const restServer = require('../utils/restServer');
const restClient = require('../utils/restClient');
const upload = require('../utils/upload');

/**
 * 响应view模板的controller
 * @param ctx
 * @returns {Promise.<void>}
 */
exports.homePage = async (ctx) => {
    const title = 'home';
    const content = 'Welcome to Koa-Scaffold';
    // const content = await restClient.get('http://www.baidu.com');
    await ctx.render('index', {
        title,
        content
    })
}

/**
 * 响应api数据的controller
 * @param ctx
 * @returns {Promise.<void>}
 */
exports.homeAPI = async (ctx) => {
    restClient.upload("http://localhost:3001/homeDisposeUpload");
    restServer.success(ctx,"Welcome to Koa-Scaffold")
}

/**
 * 处理文件上传
 * @param ctx
 * @returns {Promise.<void>}
 */
exports.homeDisposeUpload = async (ctx) => {
    // console.log("===============================================")
    // console.log(ctx.request)
    // console.log("===============================================")



    // 上传文件请求处理
    let result = { success: false }
    let serverFilePath = path.join( __dirname, '/../static/upload' )

    // 上传文件事件
    result = await upload.uploadPicture( ctx, {
        fileType: 'album',
        path: serverFilePath
    })
    // console.log(result)
    // ctx.body = result

    restServer.success(ctx,'dispose upload');
}



