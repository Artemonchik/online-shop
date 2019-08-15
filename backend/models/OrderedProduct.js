const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    const OrderedProduct = sequelize.define('OrderedProduct', {
        quantity: {
            type: Sequelize.INTEGER,
            validate: {
                min: 1,
            },
            allowNull: false,
        },
        color: {
            type: Sequelize.STRING,
            isIn: [['yellow', 'red', 'green', 'blue', 'black', 'white']],
            allowNull: false,
        },
        size: {
            type: Sequelize.INTEGER,
            validate: {
                min:0,
                max: 60,
            },
            allowNull: false
        }
    });
    OrderedProduct.associate = function (models) {
        OrderedProduct.belongsTo(models.Product);
        OrderedProduct.belongsTo(models.Order);
        OrderedProduct.belongsTo(models.Cart);
    };
    return OrderedProduct;
};