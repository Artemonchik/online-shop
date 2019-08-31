const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const {sequelize, Order, Product, User, Cart, OrderedProduct} = require('../models');
const path = require('path');
const fs = require('fs');
chai.use(chaiHttp);
chai.should();
const assert = chai.assert;

const server = 'http://localhost:8000';
let user;
describe('test http api of app', function () {
    this.timeout(15000);
    describe('test authorization', function () {
        const agent = chai.request.agent(server);

        const email = faker.internet.email();
        const password = faker.internet.password();
        const name = faker.name.firstName();
        const surname = faker.name.lastName();
        const address = faker.address.streetAddress();
        it('/api/reg should create new user and return it', async function () {
            const res = await agent.post('/api/reg').send({name, surname, email, password, address});
            user = res.body;
            const userFromBD = await User.findByPk(user.id);
            const {email: e, name: n, surname: s, address: a} = userFromBD;
            e.should.be.equal(user.email);
            n.should.be.equal(user.name);
            a.should.be.equal(user.address);
            s.should.be.equal(user.surname);
            res.should.have.status(201);
        });
        it('user must be in session', async function () {
            const res = await agent.get('/api/me').send();
            const res_user = res.body;
            res_user.id.should.be.equal(user.id);
            res_user.email.should.be.equal(user.email);
        });
        it('/api/reg mustn\'t reg when you are auth', async function () {
            const res = await agent.post('/api/reg').send({
                surname: faker.name.lastName(),
                name: faker.name.firstName(),
                email,
                password,
                address
            });
            res.should.have.status(403)
        });
        it('/api/reg shouldnt create user with existing email', async function () {
            const res = await chai.request(server)
                .post('/api/reg')
                .send({
                    email,
                    password,
                    address,
                    surname: faker.name.lastName(),
                    name: faker.name.firstName(),
                });
            res.should.have.status(400);
        });
        it('/api/logout should logout user and /api/me should throw an error', async function () {
            const res = await agent
                .post('/api/logout')
                .send();
            res.should.have.status(200);
            const res2 = await agent
                .get('/api/me')
                .send();
            res2.should.have.status(401)
        });
        it('/api/logout should throw an error if you aren\'t login', async function () {
            const res = await agent
                .post('/api/logout')
                .send();
            res.should.have.status(401)
        });

        it('/api/login should login user and /api/me should return info about him', async function () {
            const res = await agent.post('/api/login').send({password, email});
            res.should.have.status(200);
            const res2 = await agent
                .get('/api/me')
                .send();
            res2.body.id.should.be.equal(user.id)
        });
        it('/api/login must throw an error if user is already authorized', async function () {
            const res = await agent.post('/api/login').send({password, email});
            res.should.have.status(403);
        });
        it('/api/unreg shouldnt destroy information about current user with wrong password', async function () {
            const res = await agent.post('/api/unreg').send({password: 'bla'});
            res.should.have.status(400);
        });
        it('/api/unreg should destroy information about current user with valid password', async function () {
            const res = await agent.post('/api/unreg').send({password});
            res.should.have.status(200);
            const responseUser = await User.findByPk(user.id);
            assert(responseUser === null, 'user must be null')
        });

    });
    describe('test admin api', function () {
        let admin = chai.request.agent(server);
        before(async function () {
            await admin.post('/api/login').send({
                email: 'dog@mail.ru',
                password: 'qwerqwer',
            })
        });
        describe('test api connected to Product', function () {
            it('POST /api/product should add new product and add file in public dir', async function () {
                const options = [
                    {
                        color: 'red',
                        totalQuantity: 20,
                        size: 34,
                    },
                    {
                        color: 'yellow',
                        totalQuantity: 12,
                        size: 36,
                    },
                ];

                const res = await admin.post('/api/admin/product')
                    .attach('image', fs.readFileSync('./backend/test/files/image.jpg'), 'image.jpg')
                    .field({
                        name: '123e4567-e89b-12d3-a456-426655440000',
                        price: 200,
                        sex: 'M',
                        options: JSON.stringify(options)
                    })
                const product = res.body;
                console.log(product);
                product.name.should.be.equal('123e4567-e89b-12d3-a456-426655440000');
                product.options.should.be.deep.equal(options);
            })
        })
    })
});