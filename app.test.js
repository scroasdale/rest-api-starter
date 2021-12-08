const request = require('supertest');
const app = require('./app').app;
const build = require('./app').productBuilder;

describe('GET requests', () => {
    
    test('GET product/read endpoint, expect 200', async () => {
        const res = await request(app).get('/product/read')
        expect(res.statusCode).toBe(200);
    });

    test('GET bad endpoint, expect 404', async () => {
      const res = await request(app).get('/badEndPoint')
      expect(res.statusCode).toBe(404);
    });

});

describe('CREATE request', () => {
    
    test('CREATE product test', async () => {
        const res = await request(app)
                            .post('/product/create')
                            .send({
                                name : "test name", 
                                description : "test desc",
                                price : 0
                            });
        expect(res.statusCode).toBe(201);
    });

});

describe('Unit Tests', () => {

    test('product object builder', () => {
        expect(build('a name', 'a description', 42)).toMatchObject({'name' : 'a name', 'description' : 'a description', price : 42});
    });

});