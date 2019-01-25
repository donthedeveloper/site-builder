const request = require('supertest');
const app = require('../../../../app');
const User = require('../../../models/user');

describe('Auth Routes', () => {
  test('Auth routes here', done => {
    done();
  });

  test('Invalid email should return error', () => {
    return request(app)
      .post('/api/auth/login')
      .type('form')
      .send('email=test@test')
      .then(res => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.error.message).toBe(
          'Incorrect email and password combination.'
        );
      });
  });
});
