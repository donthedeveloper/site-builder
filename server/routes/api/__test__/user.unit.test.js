const request = require('supertest');
const app = require('../../../../app');
const User = require('../../../models/user');

describe('User Routes', () => {
  let userID;
  afterAll(() => {
    if (userID) {
      User.findByIdAndDelete({ _id: userID }).exec();
    }
  });

  describe('POST /user', () => {
    it('will return error without payload', () => {
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

    it('will return error without an email', () => {
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

    it('return error without a password', () => {
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

    it('will return error with invalid email', () => {
      return request(app)
        .post('/api/user')
        .type('form')
        .send('email=test@test')
        .send('password=test')
        .then(res => {
          expect(res.statusCode).toEqual(400);
          expect(Object.keys(res.body.error.errors).length).toEqual(1);
          expect(Object.keys(res.body.error.errors)).toEqual(
            expect.arrayContaining(['email'])
          );
          expect(res.body.error.errors.email.message).toBe(
            'Provide a proper email address.'
          );
        });
    });

    it('will return error with duplicate email', () => {
      return request(app)
        .post('/api/user')
        .type('form')
        .send('email=test@test.com')
        .send('password=test')
        .then(res => {
          expect(res.statusCode).toEqual(400);
          expect(Object.keys(res.body.error.errors).length).toEqual(1);
          expect(Object.keys(res.body.error.errors)).toEqual(
            expect.arrayContaining(['email'])
          );
          expect(res.body.error.errors.email.message).toBe(
            'Email already exists.'
          );
        });
    });

    it('will return user object on successful create', () => {
      return request(app)
        .post('/api/user')
        .type('form')
        .send('email=newTestUser@test.com')
        .send('password=test')
        .then(res => {
          userID = res.body.user._id;
          expect(res.statusCode).toEqual(201);
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(['user'])
          );
          expect(Object.keys(res.body.user)).toEqual(
            expect.not.arrayContaining(['password'])
          );
        });
    });
  });
});
