const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    const User = sequelize.define('User', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
                isAlpha:true,
            }
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull:false,
            validate: {
                isEmail: true
            },
            unique: {
                args: true,
                msg: 'User with this email is already exist',
            }
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,

        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type:Sequelize.STRING,
            defaultValue: 'customer',
        }
    });
    let allModels;
    User.associate = function (models) {
        User.Cart = User.hasOne(models.Cart, {onDelete:'CASCADE'});
        User.hasMany(models.Order, {onDelete: 'CASCADE'});
        allModels = models;
    };
    User.prototype.addOrderedProduct = async function(...args) {
        const cart = await this.getCart();
        return cart.addOrderedProduct(...args)
    };

    User.prototype.removeOrderedProduct = async function(...args) {
        const cart = await this.getCart();
        return cart.removeOrderedProduct(...args)
    };
    User.prototype.makeOrder = async function() {
        const {Order} = allModels;
        const cart = await this.getCart();
        const products = await cart.getOrderedProducts();
        const order = await Order.create();
        await order.setOrderedProducts(products);
        await cart.setOrderedProducts(null);
        return this.addOrder(order);
    };

    User.prototype.addProduct = async function(product, {color,size,quantity}){
        const {OrderedProduct} = allModels;
        const options = await product.getOptions();
        const sizes = options.map(e=>e.size);
        const colors = options.map(e=>e.color);
        if(quantity > product.totalQuantity || sizes.indexOf(size) === -1 || colors.indexOf(color) === -1 || sizes.indexOf(size) !== colors.indexOf(color)){
            throw new Error('arguments not valid for this product')
        }
        const orderedProduct = await OrderedProduct.create({
            color,
            size,
            quantity
        });
        await orderedProduct.setProduct(product);
        return this.addOrderedProduct(orderedProduct);
    };

    return User;
};