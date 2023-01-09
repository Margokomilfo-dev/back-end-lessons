import request from "supertest"
import {app} from "../src";
import {products} from "../src/routes/products-router";
describe('/products', function () {

    beforeAll(async () => {
        await request(app).delete('/products/__tests__/data')
    })

    it('should return arr- products', async function () {
        await request(app)
            .get('/products').
            expect(200, [])
    });

    it('should return 404 for product', async function () {
        await request(app)
            .get('/products/no_product').
            expect(404)
    });

    it('should not create new product with incorrect data', async function () {
        await request(app)
            .post('/products').send({'tit': 'cucumber'})
            expect(400)
        await request(app)
            .get('/products').
            expect(200, [])

    });

    let createdProduct: any = null
    it('should create new product with correct data', async function () {
        const createdResponse = await request(app)
            .post('/products').send({'title': 'cucumber'})
            expect(201)
        createdProduct = createdResponse.body
        expect(createdProduct).toEqual({
            id: expect.any(Number),
            title: 'cucumber'
        })
        await request(app)
            .get('/products').
            expect(200, [createdProduct])
    });

    it('should return product with query', async function () {
        await request(app)
            .get('/products/cucumber').
            expect(200, products.find(el=> el.title === 'cucumber'))
    });

    it('should return product with uri', async function () {
        const res = await request(app)
            .get('/products?title=cucumber').
            expect(200)
        expect(res.body).toEqual(createdProduct)
    });
});