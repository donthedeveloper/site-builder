require('@babel/polyfill'); // for async await
const request = require('supertest');
const app = require('../../../app');

describe("Test the root path  '/'  ", () => {
  test('The GET method ', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /(text\/html; charset=utf-8)/i)
      .expect(200)
      .end((err) => {
        if (err) {
          throw err;
        }
        done();
      });
  });
});
