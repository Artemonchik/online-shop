const Router = require('koa-router');
const admin_router = new Router();
const {User, Product, Order, OrderedProduct, Option} = require('../models');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const {checkObjFields} = require('../addons/koa-validate');

admin_router.use(async function (ctx, next) {
    const user = ctx.state.user;
    if (user && user.status === 'admin') {
        await next()
    } else {
        ctx.throw(403, 'you are not admin')
    }
});
admin_router.post('/product', async function (ctx, next) {
    checkObjFields(ctx.request.body, 'some fields of product are empty','name','price','sex');
    checkObjFields(ctx.request.files, 'image not downloaded', 'image');

    let {name, price, sex, options} = ctx.request.body;
    if(typeof options === 'string'){
        options = JSON.parse(options);
    }
    console.log(options, '\n\n\n\n');
    const {image} = ctx.request.files;
    const {path: fullPath} = image;
    if(!image.type.startsWith('image/')){
        fs.unlink(fullPath, (err) => {
            if (err) throw err;
            console.log(fullPath);
        });
        return;
    }
    // You must change this way of renaming file
    // const imageSrc =
    const format = '.' + image.type.slice(image.type.indexOf('/') + 1);
    await fsPromises.rename(fullPath, fullPath + format);
    const imageName = path.basename(fullPath + format);
    const imageSrc = path.normalize(path.join('/dist', imageName));

    console.log(options);
    const product = await Product.create({
        name,
        price,
        imageSrc,
        sex,
        Options: options,
    }, {
        include: [{
            association: Product.Option,
        }]
    });
    console.log(product);
    ctx.body = product;
});
admin_router.delete('/product/:id', async function (ctx, next) {
    const id = Number(ctx.params.id);
    console.log(typeof id);

    const product = await Product.findByPk(id);
    const fullPath = path.join('frontend/public/dist/' + path.basename(product.imageSrc));
    await product.destroy();
    await fsPromises.unlink(fullPath);
    ctx.body = 'product was destroyed successful'
});
module.exports = admin_router;

function f() {

}