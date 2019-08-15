const Sequelize = require('sequelize');
const {db} = require('../config');

const sequelize = new Sequelize(db.name,db.username, db.password, {
    host: db.host,
    dialect: db.dialect,
    logging: false,
});

const Cart = require('./Cart.js')(sequelize);
const Customer = require('./Customer')(sequelize);
const Order = require('./Order')(sequelize);
const Product = require('./Product')(sequelize);
const OrderedProduct = require('./OrderedProduct')(sequelize);
const Option = require('./Option.js')(sequelize)
const models = {
    Cart,
    Customer,
    Order,
    Product,
    OrderedProduct,
    Option,
};

Object.values(models).forEach(model =>{
   if(model.associate){
       model.associate(models);
   }
});

module.exports = {
    sequelize,
    ...models
};

