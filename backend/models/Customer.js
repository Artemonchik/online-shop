const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    const Customer = sequelize.define('Customer', {
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
        }
    });
    let allModels;
    Customer.associate = function (models) {
        Customer.Cart = Customer.hasOne(models.Cart, {onDelete:'CASCADE'});
        Customer.hasMany(models.Order, {onDelete: 'CASCADE'});
        allModels = models;
    };
    Customer.prototype.addOrderedProduct = async function(...args) {
        const cart = await this.getCart();
        return cart.addOrderedProduct(...args)
    };

    Customer.prototype.removeOrderedProduct = async function(...args) {
        const cart = await this.getCart();
        return cart.removeOrderedProduct(...args)
    };
    Customer.prototype.makeOrder = async function() {
        const {Order} = allModels;
        const cart = await this.getCart();
        const products = await cart.getOrderedProducts();
        const order = await Order.create();
        await order.setOrderedProducts(products);
        await cart.setOrderedProducts(null);
        return this.addOrder(order);
    };

    Customer.prototype.addProduct = async function(product, {color,size,quantity}){
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

    return Customer;
};