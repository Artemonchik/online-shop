const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    const Product = sequelize.define('Product', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },

        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: {
                min:0,
                isDividedByOneHundredth(value){
                    let n = parseFloat(value) * 100;
                    if(n % 1 !== 0){
                        throw new Error('float must have only two digits after \',\'')
                    }
                }
            }
        },
        imageSrc: {
            type: Sequelize.STRING,
        },
        sex:{
            type: Sequelize.STRING,
            validate:{
                isIn:[['M','F']]
            }
        }
    });
    Product.associate = function (models) {
        Product.Option = Product.hasMany(models.Option,{onDelete: 'CASCADE'});
        Product.hasMany(models.OrderedProduct);
    };
    return Product;
};