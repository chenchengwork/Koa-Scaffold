/**
 * Created by chencheng on 17-7-20.
 */

/**
 * 响应成功
 * @param ctx
 * @param data
 * @param msg
 */
exports.success = (ctx, data, msg = null) => {
    ctx.status = 200;

    ctx.body = {
        code: "success",
        msg: msg || "success",
        data: data
    };
}

/**
 * 响应失败
 * @param ctx
 * @param data
 * @param msg
 */
exports.error = (ctx, data = "", msg = null) => {
    ctx.status = 500;

    ctx.body = {
        code: "error",
        msg: msg || "error interval server",
        data: data
    };
}