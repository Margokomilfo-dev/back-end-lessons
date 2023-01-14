import request from "supertest"
import {app} from "../src";
import {ProductType} from "../src/repositories/products-repository";

describe('/products', function () {

    let products: Array<ProductType>
    beforeAll(async () => {
        const res = await request(app).delete('/products/__tests__/delete-all')
        products = res.body
    })

    it('+GET should return arr- products', async function () {
        await request(app)
            .get('/products').
            expect(200, [])
    });

    it('-GET product, should return 404 for product', async function () {
        await request(app)
            .get('/products/no_product').
            expect(404)
    });

    it('-POST should not create new product with incorrect data', async function () {
        await request(app)
            .post('/products').send({'tit': 'cucumber'}).
            expect(400)
        await request(app)
            .get('/products').
            expect(200, [])

    });

    it('-POST should not create new product with incorrect data', async function () {
        await request(app)
            .post('/products').send({'title': ''}).
            expect(400,[{ param: 'title', message: 'title not valid' }])
        await request(app)
            .get('/products').
            expect(200, [])

    });

    let createdProduct: any = null
    it('+POST should create new product with correct data', async function () {
        const createdResponse = await request(app)
            .post('/products').send({'title': 'cucumber'}).
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

    it('+GET/ should return product with query', async function () {
        await request(app)
            .get('/products/cucumber').
            expect(200, createdProduct)
    });

    it('+GET? should return product with uri', async function () {
        const res = await request(app)
            .get('/products?title=cucumber').
            expect(200)
        expect(res.body).toEqual([createdProduct])
    });
    it('-PUT should not update product with incorrect data', async function () {
      await request(app)
            .put('/products/'+ createdProduct.id).send({'title': ''}).
            expect(400, [{ param: 'title', message: 'title not valid' }])


        await request(app)
            .get('/products').
            expect(200, [createdProduct])
    });

    it('-PUT should not update product with incorrect data', async function () {
      await request(app)
            .put('/products/'+ 'hello').send({'title': ''}).
            expect(400, [
                {param: 'id', message: 'id not valid'},
              { param: 'title', message: 'title not valid' }
          ])

        await request(app)
            .get('/products').
            expect(200, [createdProduct])
    });
    it('-PUT should not update product with incorrect data', async function () {
        await request(app)
            .put('/products/'+ 158).send({'title': 'carrot'}).
            expect(404)

        await request(app)
            .get('/products').
            expect(200, [createdProduct])
    });

    it('+PUT should update product with correct data', async function () {
      await request(app)
            .put('/products/'+ createdProduct.id).send({'title': 'carrot'}).
            expect(201)

        await request(app)
            .get('/products').
            expect(200, [{...createdProduct, title: 'carrot'}])
    });

});