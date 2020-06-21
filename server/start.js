const path = require('path');

const Koa = require('koa');
const koaStatic = require('koa-static');
const getPort = require('get-port');

const KoaRouter = require('koa-router');
const json = require('koa-json');
const channels = require('./channels');

async function runServer() {
    const port = await getPort({ port: 3000 });

    const app = new Koa();
    app.use(koaStatic(path.join(__dirname, '..', 'static')));

    //Json Prettier Middleware
    app.use(json());
    //adding router GET method with channels data
    const router = new KoaRouter();
    router.get('/data', ctx => ctx.body = channels);
    app.use(router.routes()).use(router.allowedMethods());

    app.listen(port);

    console.log(`server started at http://localhost:${port}/`);
}

runServer().catch(console.error);