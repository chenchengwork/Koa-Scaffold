/**
 * Created by chencheng on 17-8-3.
 */
/**!
 * koa-body-parser - index.js
 * Copyright(c) 2014
 * MIT Licensed
 *
 * Authors:
 *   dead_horse <dead_horse@qq.com> (http://deadhorse.me)
 *   fengmk2 <m@fengmk2.com> (http://fengmk2.com)
 */

'use strict';

/**
 * Module dependencies.
 */

const parse = require('co-body');
const copy = require('copy-to');

function formatOptions(opts, type) {
    var res = {};
    copy(opts).to(res);
    res.limit = opts[type + 'Limit'];
    return res;
}

function extendType(original, extend) {
    if (extend) {
        if (!Array.isArray(extend)) {
            extend = [extend];
        }
        extend.forEach(function (extend) {
            original.push(extend);
        });
    }
}

const defaultOpts = {
    jsonLimit: '1mb',
    formLimit: '1mb',
    textLimit: '1mb',
    extendTypes:{
        json:['application/json'],
        form:['application/x-www-form-urlencoded'],
        text: ['text/plain']
    }
}

/**
 * @param [Object] opts
 *   - {String} jsonLimit default '1mb'
 *   - {String} formLimit default '1mb'
 *   - {String} textLimit default '1mb'
 *   - {string} encoding default 'utf-8'
 *   - {Object} extendTypes
 *   - {Function} [onerror]
 */

module.exports = function (opts = defaultOpts) {
    const onerror = opts.onerror;

    opts.onerror = undefined;

    // force co-body return raw body
    opts.returnRawBody = true;

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

    const jsonOpts = formatOptions(opts, 'json');
    const formOpts = formatOptions(opts, 'form');
    const textOpts = formatOptions(opts, 'text');

    const extendTypes = opts.extendTypes || {};

    extendType(jsonTypes, extendTypes.json);
    extendType(formTypes, extendTypes.form);
    extendType(textTypes, extendTypes.text);

    const parseBody = async (ctx) => {
        if (ctx.request.is(jsonTypes)) {
            return await parse.json(ctx, jsonOpts);
        }
        else if (ctx.request.is(formTypes)) {
            return await parse.form(ctx, formOpts);
        }
        else if (ctx.request.is(textTypes)) {
            return await parse.text(ctx, textOpts) || '';
        }
        return {};
    }


    return async (ctx, next) => {
        if (ctx.request.body !== undefined) return await next();
        if (ctx.disableBodyParser) return await next();
        try {
            const res = await parseBody(ctx);
            ctx.request.body = 'parsed' in res ? res.parsed : {};
            if (ctx.request.rawBody === undefined) ctx.request.rawBody = res.raw;
        } catch (err) {
            if (onerror) {
                onerror(err, ctx);
            } else {
                throw err;
            }
        }
        await next();
    };

};



