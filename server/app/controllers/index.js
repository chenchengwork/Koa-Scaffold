const path = require('path');

const restServer = require('../../vendor/RESTful/Server');
const restClient = require('../../vendor/RESTful/Client');
const uploadUtil = require('../../vendor/uploadUtil');


/**
 * 响应view模板的controller
 * @param ctx
 * @returns {Promise.<void>}
 */
exports.homePage = async (ctx) => {
    const title = 'home';
    const content = 'Welcome to Koa-Scaffold';
    await ctx.render('index', {
        title,
        content
    })
}

/**
 * 响应get api数据的controller
 * @param ctx
 * @returns {Promise.<void>}
 */
exports.getHomeAPI = async (ctx) => {

    //测试上传文件
    /*const resp = await restClient.upload("http://localhost:3001/homeDisposeUpload",{
        file1:__dirname + '/../static/img/meinv1.jpg',
        file2:__dirname + '/../static/img/meinv2.jpg',
        field1:"test"
    });*/


    //测试post
    /*restClient.post("http://localhost:3001/postHomeAPI",{
        a:1,
        b:2,
        c:3
    });*/

    //测试postJson
    // restClient.postJson("http://localhost:3001/postHomeAPI",{
    //     a:1,
    //     b:2,
    //     c:3
    // });

    restServer.success(ctx,"This is get method");
}


exports.postHomeAPI = async (ctx) => {
    console.log(ctx.request.body);      //获取post参数

    restServer.success(ctx,ctx.request.body,"This is post method");
}

exports.postJsonHomeAPI = async (ctx) => {

    console.log(ctx.request.body);      //获取post参数

    restServer.success(ctx,ctx.request.body,"This is postJson method");
}

exports.postTextHomeAPI = async (ctx) => {

    console.log(ctx.request.body);      //获取post参数

    restServer.success(ctx,ctx.request.body,"This is postText method");
}



/**
 * 处理文件上传
 * @param ctx
 * @returns {Promise.<void>}
 */
exports.postUploadAPI = async (ctx) => {

    console.log(ctx.request.body);      //获取除文件字段以外的其他字段
    console.log(ctx.request.files);     //获取所有的上传文件

    restServer.success(ctx,null,'文件上传成功');
}




