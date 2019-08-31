const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    const Option = sequelize.define('Option', {
        color:{
            type: Sequelize.STRING,
            validate:{
                isIn: [['yellow', 'red', 'green', 'blue', 'black', 'white']]
            },
            allowNull: false
        },
        totalQuantity: {
            type: Sequelize.INTEGER,
            validate: {
                min:0,
            },
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
    return Option;
};