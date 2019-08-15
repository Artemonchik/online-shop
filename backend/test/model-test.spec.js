const chai = require('chai');
const faker = require('faker');
chai.should();
const {sequelize, Order, Product, Customer, Cart, OrderedProduct} = require('../models');
describe('test database', function () {
    this.timeout(15000);
    describe('test success starting sequelize', function () {
        it('sequelize should run success', async function () {
            await sequelize.sync(
                {
                    force: true,
                    logging: false,
                })
        })
    });
    describe('test models', function () {
        describe('test instances of models', function () {
            it('there must be an error after creating 2 customer with the same email', function f(done) {
                let email = faker.internet.email();
                Customer.create({
                    name: faker.name.firstName(),
                    surname: faker.name.lastName(),
                    address: faker.address.streetAddress(),
                    password: faker.internet.password(),
                    email,
                }).then((c1) => {
                    return Customer.create({
                        name: faker.name.firstName(),
                        surname: faker.name.lastName(),
                        address: faker.address.streetAddress(),
                        password: faker.internet.password(),
                        email
                    })
                }).then((c2) => {
                    done(new Error('There must be mistake'))
                }).catch(e=>{
                    done()
                });
            })
        });
        describe('testing assotiations between all models', function () {
            let customers = [];
            let products = [];
            let carts = [];
            let orders = [];
            let orderedProducts = [];
            before(async function () {
                for (let i = 0; i < 10; i++) {
                    customers.push(await Customer.create({
                        name: faker.name.firstName(),
                        surname: faker.name.lastName(),
                        address: faker.address.streetAddress(),
                        password: faker.internet.password(),
                        email: faker.internet.email(),
                    }));

                    products.push(await Product.create({
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
                    }));
                    carts.push(await Cart.create());
                    orders.push(await Order.create())
                }

                orderedProducts.push(await OrderedProduct.create({
                    quantity: 3,
                    color: 'red',
                    size: 32
                }));
                await orderedProducts[0].setProduct(products[0]);
                orderedProducts.push(await OrderedProduct.create({
                    quantity: 4,
                    color: 'red',
                    size: 32
                }));
                await orderedProducts[1].setProduct(products[2]);
                orderedProducts.push(await OrderedProduct.create({
                    quantity: 5,
                    color: 'red',
                    size: 32
                }));
                await orderedProducts[2].setProduct(products[1]);
                orderedProducts.push(await OrderedProduct.create({
                    color: 'red',
                    size: 3,
                    quantity: 6,
                }));
                await orderedProducts[3].setProduct(products[1]);
                orderedProducts.push(await OrderedProduct.create({
                    quantity: 7,
                    color: 'red',
                    size: 32
                }));
                await orderedProducts[4].setProduct(products[3]);
                for (let i = 0; i < 10; i++) {
                    await customers[i].setCart(carts[i])
                }
                await carts[0].addOrderedProduct(orderedProducts[0]);
                await carts[0].addOrderedProduct(orderedProducts[1]);
                await carts[0].addOrderedProduct(orderedProducts[2]);
                await carts[1].addOrderedProduct(orderedProducts[3]);
                await carts[1].addOrderedProduct(orderedProducts[4]);
                await orders[0].addOrderedProduct(orderedProducts[0]);
                await orders[0].addOrderedProduct(orderedProducts[1]);
                await orders[1].addOrderedProduct(orderedProducts[2]);
                await orders[0].addOrderedProduct(orderedProducts[3]);
                await customers[0].addOrder(orders[0]);
                await customers[0].addOrder(orders[1]);
            });
            it('product 1 must be in two ordered products', async function () {
                const op = await products[1].getOrderedProducts();
                op.should.have.length(2);
            });
            it('customer[0] must have 3 ordered producti in his cart with products 0 2 1', async function () {
                const cart = await customers[0].getCart();
                const op = await cart.getOrderedProducts();
                op.should.have.length(3);
                const arr = [1, 2, 3];
                for (let i = 0; i < 3; i++) {
                    const p = await op[i].getProduct();
                    p.id.should.be.oneOf(arr);
                    const index = arr.indexOf(p.id);
                    arr.splice(index, 1);
                }
                arr.should.have.length(0)
            });
            it('customer[0] must have 2 orders with total 4 products', async function () {
                const ods = await customers[0].getOrders();
                ods.should.have.length(2);
                const arr = [];
                for (let i = 0; i < 2; i++) {
                    const prdcts = await ods[i].getOrderedProducts();
                    arr.push(...prdcts)
                }
                arr.should.have.length(4);
            });
            after(async function () {
                for (let i = 0; i < 10; i++) {
                    await customers[i].destroy();
                    await carts[i].destroy();
                    if (i <= 4) await orderedProducts[i].destroy();
                    await orders[i].destroy();
                    await products[i].destroy();
                }
                products = [];
                customers = [];
                carts = [];
                orders = [];
                orderedProducts = [];
            })
        });
        describe('test custom methods of object', function () {
            let customer = null;
            let cart = null;
            let orderedProduct = null;
            let product = null;
            describe('test custom methods of Customer model', function () {
                beforeEach(async function () {
                    customer = await Customer.create({
                        name: faker.name.firstName(),
                        surname: faker.name.lastName(),
                        address: faker.address.streetAddress(),
                        password: faker.internet.password(),
                        email: faker.internet.email(),
                        Cart: {}
                    }, {
                        include: Customer.Cart
                    });
                    product = await Product.create({
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
                    orderedProduct = await OrderedProduct.create({
                        quantity: 3,
                        color: 'red',
                        size: 32
                    })
                });

                afterEach(async function () {
                    const cart = await customer.getCart();
                    await cart.destroy();
                    await customer.destroy();
                    await orderedProduct.destroy();
                    await product.destroy();
                });
                it('customer.addOrderedProduct() must add product in his cart', async function () {
                    await customer.addOrderedProduct(orderedProduct);
                    const cart = await customer.getCart();
                    const pr = (await cart.getOrderedProducts())[0];
                    pr.id.should.be.equal(orderedProduct.id)
                });
                it('customer.removeOrderedProduct() must remove product from his cart', async function () {
                    await customer.removeOrderedProduct(orderedProduct);
                    const cart = await customer.getCart();
                    const pr = await cart.getOrderedProducts();
                    pr.should.have.length(0)
                });
                it('customer.makeOrder() should add new order with items in a cart and clear cart', async function () {
                    await customer.addOrderedProduct(orderedProduct);
                    await customer.makeOrder();
                    const cart = await customer.getCart();
                    const cartOrderedProducts = await cart.getOrderedProducts();
                    cartOrderedProducts.should.have.length(0);

                    const customerOrders = await customer.getOrders();
                    customerOrders.should.have.length(1);
                    const customerOrderedProducts = await customerOrders[0].getOrderedProducts();
                    customerOrderedProducts.should.have.length(1);
                    const arr1 = customerOrderedProducts.map(e => e.id);
                    arr1.sort();
                    const arr2 = [orderedProduct.id];
                    arr2.sort();
                    arr1.should.have.ordered.members(arr2);
                });

                it('customer.addProduct(product, options) should add product in a cart', async function () {
                    await customer.addProduct(product, {color: 'white', size: 37, quantity: 3});
                    const cart = await customer.getCart();
                    const [op] = await cart.getOrderedProducts();
                    const p = await op.getProduct();
                    product.id.should.be.equal(p.id)
                });


            })
        })
    });
});
