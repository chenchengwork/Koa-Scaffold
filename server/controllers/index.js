const path = require('path');

const restServer = require('../utils/restServer');
const restClient = require('../utils/restClient');
const uploadUtil = require('../utils/uploadUtil');

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

    // 上传文件事件
    let result = await uploadUtil.do( ctx, {
        filePath: path.join( __dirname, '/../static/upload/' ),
        allowSuffix:['jpg'],
    });

    if(result.success){
        restServer.success(ctx,null,'文件上传成功');
    }else{
        restServer.error(ctx,null,'文件上传失败')
    }
}



