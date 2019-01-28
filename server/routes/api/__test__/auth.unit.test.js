const request = require('supertest');
const app = require('../../../../app');
const User = require('../../../models/user');

describe('Auth Routes', () => {
  beforeAll(() => {
    return User.create({ email: 'testUser@test.com', password: 'test' });
  });

  afterAll(() => {
    return User.findOneAndDelete({ email: 'testUser@test.com' });
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

  test('Invalid password should return error', () => {
    return request(app)
      .post('/api/auth/login')
      .type('form')
      .send('email=test@test.com')
      .send('password=wrongpassword')
      .then(res => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.error.message).toBe(
          'Incorrect email and password combination.'
        );
      });
  });

  test('Valid email and password', () => {
    return request(app)
      .post('/api/auth/login')
      .type('form')
      .send('email=testUser@test.com')
      .send('password=test')
      .then(res => {
        console.log('----User----', res.body);
        expect(res.statusCode).toEqual(200);
        expect(Object.keys(res.body)).toEqual(
          expect.not.arrayContaining(['password'])
        );
      });
  });
});
