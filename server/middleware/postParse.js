/**
 * Created by chencheng on 17-7-26.
 */
const path = require('path');
const busboy = require('koa-busboy');               //中间件
const bodyParser = require('koa-bodyparser');       //中间件

//用于解析Content-Type： multipart/form-data

exports.postFormData = busboy({
    dest: path.join(
        __dirname,
        '/../static/upload/'
    ),
    fnDestFilename: (fieldName, filename) => {
        return filename
    }
});


//用于解析Content-Type： application/x-www-form-urlencoded
exports.postUrlencoded = bodyParser({
    enableTypes: ['form'],
    strict: true,
    extendTypes: {
        form: ['application/x-www-form-urlencoded']
    },
    onerror: function (err, ctx) {
        ctx.throw('body parse error', 422);
    }
});

//用于解析Content-Type： text/plain
exports.postText = bodyParser({
    enableTypes: ['text'],
    strict: true,
    extendTypes: {
        text: ['text/plain']
    },
    onerror: function (err, ctx) {
        ctx.throw('body parse error', 422);
    }
});

//默认用于解析Content-Type： application/json
exports.postJson = bodyParser({
    enableTypes: ['json'],
    strict: true,
    extendTypes: {
        text: ['application/json']
    },
    onerror: function (err, ctx) {
        ctx.throw('body parse error', 422);
    }
});