const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    const Order = sequelize.define('Order');

    Order.associate = function (models) {
        Order.belongsTo(models.User);
        Order.hasMany(models.OrderedProduct, {onDelete:'CASCADE'})
    };
    return Order;
};