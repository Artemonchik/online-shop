const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    const Cart = sequelize.define('Cart');

    Cart.associate = function (models) {
        Cart.belongsTo(models.User);
        Cart.hasMany(models.OrderedProduct, {onDelete: 'CASCADE'})

    };
    return Cart;
};