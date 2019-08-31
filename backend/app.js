const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const send = require('koa-send');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpack = require('webpack');
const webpack_config = require('../webpack.config');
const {mainRouter} = require('./routers/routing.js');
const {sequelize, Order, Product, User, Cart, OrderedProduct} = require('./models');
const {createFakeData} = require('./fake-sequelize-data');
const passport = require('./middlewares/passport');
const SequelizeSessionStore = require('koa-generic-session-sequelize');
const session = require('koa-generic-session');
const koaBody = require('koa-body');
var koaLogger = require('koa-bunyan');
var bunyan = require('bunyan');

const compiler = webpack(webpack_config, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.log('There are webpack exception', err, stats.toJson('minimal'));
        return;
    }
    console.log('webpack initialized successful!')
});

const logger = bunyan.createLogger({name: "app"});

const app = new Koa();
app.use(koaLogger(logger, {
    level:'info',
}));
app.keys = ['mWTWHSPKdiUJqg1UKAjT8Y44Igv15VIm'];
// app.use(webpackDevMiddleware(compiler, {
//    publicPath: webpack_config.output.publicPath
// }));
sequelize.sync({force: true}).then(async function () {
    await createFakeData();
    app.use(serve('frontend/public'));
    app.use(koaBody({
        multipart: true,
        formidable:{
            uploadDir: path.resolve('frontend/public/dist/')
        }
    }));
    app.use(session({
        store: new SequelizeSessionStore(
            sequelize, {
                tableName: 'sessions',
            },
        )
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(async (ctx, next) => {
        if (!ctx.path.startsWith('/api/')) {
            await send(ctx, '/index.html', {root: path.resolve('frontend/public')});
        } else {
            await next();
        }
    });
    app.use(mainRouter.routes(), mainRouter.allowedMethods());
    app.listen(8000, () => {
        console.log('server bind on 8000 port')
    });
});