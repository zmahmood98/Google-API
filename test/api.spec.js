const request = require('supertest');
const app = require('../app');

describe('api', () => {
    it('GET / responds with status code 404', (done) => {
        request(app)
        .get('/')
        .expect(404, done);
    });

    describe('/search', () => {
        let testData = [
            {
                "title": "Dog Supplies | Food, Toys, Collars & Care | Pets at Home",
                "preview": "Keep your furry best friend healthy, happy and full of life! Shop our dog supplies for everything that a dog will ever need. Free delivery on orders over ...",
                "url": "https://www.petsathome.com/shop/en/pets/dog",
                "info": { "main": {}, "bottom": {}, "links": [] },
                "date": null,
                "freq": 1
            }
        ];

        it('GET /search responds with status code 400', (done) => {
            request(app)
            .get('/search')
            .expect(400, done);
        });

        it('GET /search?q responds with json', (done) => {
            request(app)
            .get('/search?q')
            .expect('Content-Type', /json/, done);
        });

        it('GET /search?q responds with empty array', (done) => {
            request(app)
            .get('/search?q')
            .expect([], done);
        });

        it('GET /search?q=collars responds with correct result', (done) => {
            request(app)
            .get('/search?q=collars')
            .expect(testData, done);
        });
    });
});
