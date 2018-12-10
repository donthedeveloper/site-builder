const request = require('supertest');
const add = require('./simpleFunctionToTest');
const app = require('../../../app');
describe("Test the root path  '/'  ", () => {
  test('is jest working', () => {
    expect(add(3, 5)).toBe(3 + 5);
  });

  test('The GET method', done => {
    // const response = await request(app);
    // console.log('response: ', response);
    return request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log('ERROR\n', res.error);
          done(err);
        } else {
          console.log(res);
          done();
        }
      });
  });
});
