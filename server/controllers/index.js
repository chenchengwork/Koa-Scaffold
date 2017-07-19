// module.exports = async (ctx) => {
//     const title = 'home';
//     const content = 'Welcome to Koa-Scaffold';
//
//     await ctx.render('index', {
//         title,
//         content
//     })
// }

module.exports = function (ctx,next) {
    const title = 'home';
    const content = 'Welcome to Koa-Scaffold';

    ctx.body = "Welcome to Koa-Scaffold";
}