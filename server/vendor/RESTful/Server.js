/**
 * Created by chencheng on 17-7-20.
 */

'use strict';

class Server {

    /**
     * 响应成功
     * @param {Object} ctx
     * @param {*} data
     * @param {String} [msg]
     */
    success(ctx, data, msg = null) {
        ctx.status = 200;

        ctx.body = {
            code: "success",
            msg: msg || "success",
            data
        };
    }

    /**
     * 响应失败
     * @param {Object} ctx
     * @param {*} data
     * @param {String} [msg]
     */
    error(ctx, data, msg = null) {
        ctx.status = 500;

        ctx.body = {
            code: "error",
            msg: msg || "error interval server",
            data
        };
    }
}

module.exports = new Server();