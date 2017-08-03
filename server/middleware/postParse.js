/**
 * Created by chencheng on 17-7-26.
 */
'use strict';

const path = require('path');
const busboy = require('koa-busboy');               //中间件
const bodyParser = require('koa-bodyparser');       //中间件

const helpers = require('../vendor/Helpers');


const postParse = (opts) => {

    return async (ctx, next) => {
        // default json types
        const jsonTypes = [
            'application/json',
            'application/json-patch+json',
            'application/vnd.api+json',
            'application/csp-report',
        ];

        // default form types
        const formTypes = [
            'application/x-www-form-urlencoded',
        ];

        // default text types
        const textTypes = [
            'text/plain',
        ];


        if(ctx.request.is(jsonTypes)){
            console.log(111);
            return await bodyParser({
                enableTypes: ['json'],
                strict: true,
                extendTypes: {
                    text: ['application/json']
                },


                onerror: function (err, ctx) {
                    ctx.throw('body parse error', 422);
                }
            });

        }else if(ctx.request.is(formTypes)){
            console.log(222);
            return await bodyParser({
                enableTypes: ['form'],
                strict: true,
                extendTypes: {
                    form: ['application/x-www-form-urlencoded']
                },

                onerror: function (err, ctx) {
                    ctx.throw('body parse error', 422);
                }
            })


        }else if(ctx.request.is(textTypes)){
            console.log(333);
            return await bodyParser({
                enableTypes: ['text'],
                strict: true,
                extendTypes: {
                    text: ['text/plain']
                },

                onerror: function (err, ctx) {
                    ctx.throw('body parse error', 422);
                }
            });

        }
        console.log(444);
        return await next();
    }

};

module.exports = postParse;
/*
//用于解析Content-Type： multipart/form-data
exports.postFormData = busboy({
    dest: path.join(
        __dirname,
        helpers.tmpPath(),
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
});*/
