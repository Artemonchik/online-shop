const Router = require('koa-router');
const mainRouter = new Router();
const api_router = new Router();
const admin_router = require('./admin.js');
const bcrypt = require('bcrypt');
const passport = require('../middlewares/passport');


const {SequelizeUniqueConstraintError} = require('sequelize');
const {User, Product, Order, OrderedProduct, Option} = require('../models');

api_router.use(['/reg', '/login'], async function (ctx, next) {
    if (ctx.isAuthenticated()) {
        ctx.throw(403, 'You are authorized');
    }
    await next()
});
api_router.post('/reg', async (ctx, next) => {
    let {name, surname, password, email, address} = ctx.request.body;
    const hash = await bcrypt.hash(password, 8);
    try {
        await User.create({name, surname, password: hash, email, address});
    } catch (err) {
        ctx.throw(400, err.message)
    }
    await passport.authenticate('local', {}, async (err, user) => {
        if (!user) {
            ctx.throw(401, 'Incorrect login/password');
        }
        ctx.login(user, (err) => {
            if (err) {
                ctx.throw(401, err.message);
            }
            ctx.status = 201;
            ctx.message = 'You are reg';
            ctx.body = user;
        });
    })(ctx);
});

api_router.post('/login', async (ctx) => {
    await passport.authenticate('local', {}, async (err, user) => {
        if (!user) {
            ctx.throw(401, 'Incorrect login/password');
        }
        ctx.login(user, (err) => {
            if (err) {
                ctx.throw(401, err.message);
            }
            ctx.status = 200;
            ctx.message = 'You was authorized';
            ctx.body = user;
        });
    })(ctx);
});
api_router.use(['/me', '/logout', '/unreg'], async function (ctx, next) {
    if (!ctx.isAuthenticated()) {
        ctx.throw(401, 'unauthorized');
    }
    await next();
});
api_router.get('/me', async function (ctx, next) {
    ctx.body = ctx.state.user;
});
api_router.get('/men', async function (ctx) {
    const men_items = await Product.findAll({
        where: {
            sex: 'M',
        },
        include: [{
            association: Product.Option,
        }]
    });
    ctx.body = men_items;
});
api_router.get('/women', async function (ctx) {
    const women_items = await Product.findAll({
        where: {
            sex: 'F',
        },
        include: [{
            association: Product.Option,
        }]
    });
    ctx.body = women_items;
});
api_router.get('/product/:id', async function (ctx) {
    const {id} = ctx.params;
    console.log(id);
    const product = await Product.findByPk(Number(id), {
        include: [{association: Product.Option}]
    });
    console.log(product);
    ctx.body = product;
});

api_router.post('/logout', async (ctx) => {
    ctx.logout();
    ctx.status = 200;
});
api_router.post('/unreg', async (ctx) => {
    const user = ctx.state.user;
    const {password} = ctx.request.body;
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
        ctx.logout();
        await user.destroy();
        ctx.status = 200;
        ctx.body = 'You was unreg successful';
    } else {
        ctx.status = 400;
        ctx.body = 'Password doesn\'t match';
    }
});

api_router.use('/admin', admin_router.routes(), admin_router.allowedMethods());
mainRouter.use('/api', api_router.routes(), api_router.allowedMethods());
module.exports.mainRouter = mainRouter;