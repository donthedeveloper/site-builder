require('@babel/polyfill'); // for async await
const request = require('supertest');
const app = require('../../../app');

describe("Test the root path  '/'  ", () => {
  test('The GET method ', (done) => {
    return request(app)
      .get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200)
      .end((err) => {
        if (err) console.error(err)
        done()
      })
  })
})

