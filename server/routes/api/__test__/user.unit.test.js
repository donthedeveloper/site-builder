const request = require('supertest');
const app = require('../../../../app');

describe('User Routes', () => {
  test('GET method', done => {
    done();
  });

  test('POST method with no payload', () => {
    return request(app)
      .post('/api/user')
      .set('Accept', 'application/json')
      .then(res => {
        expect(res.statusCode).toBe(400);
        expect(res.body.error.errors.email.message).toBe(
          'You must provide an email address.'
        );
      });
  });
});
