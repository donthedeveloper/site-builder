const request = require('supertest');
const app = require('../../../../app');

describe('User Routes', () => {
  describe('GET /user', () => {
    test('GET method', done => {
      done();
    });
  });

  describe('POST /user', () => {
    test('POST method with no payload', () => {
      return request(app)
        .post('/api/user')
        .type('form')
        .then(res => {
          expect(res.statusCode).toEqual(400);
          expect(Object.keys(res.body.error.errors).length).toEqual(2);
          expect(Object.keys(res.body.error.errors)).toEqual(
            expect.arrayContaining(['email', 'password'])
          );
          expect(res.body.error.errors.email.message).toBe(
            'You must provide an email address.'
          );
          expect(res.body.error.errors.password.message).toBe(
            'You must provide a password.'
          );
        });
    });

    test('POST method with no email', () => {
      return request(app)
        .post('/api/user')
        .type('form')
        .send('password=test')
        .then(res => {
          expect(res.statusCode).toEqual(400);
          expect(Object.keys(res.body.error.errors).length).toEqual(1);
          expect(Object.keys(res.body.error.errors)).toEqual(
            expect.arrayContaining(['email'])
          );
          expect(res.body.error.errors.email.message).toBe(
            'You must provide an email address.'
          );
        });
    });

    test('POST method with no password', () => {
      return request(app)
        .post('/api/user')
        .type('form')
        .send('email=example@test.com')
        .then(res => {
          expect(res.statusCode).toEqual(400);
          expect(Object.keys(res.body.error.errors).length).toEqual(1);
          expect(Object.keys(res.body.error.errors)).toEqual(
            expect.arrayContaining(['password'])
          );
          expect(res.body.error.errors.password.message).toBe(
            'You must provide a password.'
          );
        });
    });
  });
});
