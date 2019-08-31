const {sequelize, Order, Product, User, Cart, OrderedProduct} = require('./models');
const bcrypt = require('bcrypt');
const faker = require('faker');
async function createFakeData() {
    for (let i = 0; i < 20; i++) {
        await Product.create({
            name: faker.lorem.word(),
            price: faker.commerce.price(),
            imageSrc: faker.image.imageUrl(),
            sex: faker.random.arrayElement(['M', 'F']),
            Options: [
                {color: 'red', totalQuantity: faker.random.number({min: 5, max: 10}), size: 34},
                {color: 'green', totalQuantity: faker.random.number({min: 5, max: 10}), size: 35},
                {color: 'blue', totalQuantity: faker.random.number({min: 5, max: 10}), size: 36},
                {color: 'white', totalQuantity: faker.random.number({min: 5, max: 10}), size: 37},
    ]
        }, {
            include: [{
                association: Product.Option,
            }]
        });
    }
    await User.create({
        name: 'Artem',
        surname: 'Tarasov',
        address: 'shebaldina 199',
        password: await bcrypt.hash('qwerqwer', 8),
        email: 'dog@mail.ru',
        status: 'admin',
    })
}
module.exports.createFakeData = createFakeData;