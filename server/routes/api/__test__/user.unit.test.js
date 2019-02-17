const request = require('supertest');
const app = require('../../../../app');
const User = require('../../../models/user');

describe('User Routes', () => {
  let userID;
  afterAll(() => {
    if (userID) {
      // Delete test user after create test
      User.findByIdAndDelete({ _id: userID }).exec();
    }
  });

  describe('POST /user', () => {
    it('will return error without payload', async () => {
      const res = await request(app)
        .post('/api/user')
        .type('form'); // send post with no payload
      const errorObj = res.body.error.errors;
      expect(res.statusCode).toEqual(400);
      expect(Object.keys(errorObj)).toEqual(['email', 'password']); // should return two errors
      expect(errorObj.email.message).toBe('You must provide an email address.');
      expect(errorObj.password.message).toBe('You must provide a password.');
    });

    it('will return error without an email', async () => {
      const res = await request(app)
        .post('/api/user')
        .type('form')
        .send({ password: 'test' }); // send post with no email
      const errorObj = res.body.error.errors;
      expect(res.statusCode).toEqual(400);
      expect(Object.keys(errorObj)).toEqual(['email']); // should return one error for email
      expect(errorObj.email.message).toBe('You must provide an email address.');
    });

    it('return error without a password', async () => {
      const res = await request(app)
        .post('/api/user')
        .type('form')
        .send({ email: 'notUsedEmail@test.com' }); // send post with no password
      const errorObj = res.body.error.errors;
      expect(res.statusCode).toEqual(400);
      expect(Object.keys(errorObj)).toEqual(['password']); // should return one error for password
      expect(errorObj.password.message).toBe('You must provide a password.');
    });

    it('will return error with invalid email', async () => {
      const res = await request(app)
        .post('/api/user')
        .type('form')
        .send({ email: 'invalidEmail@test', password: 'test' }); // send post with invalid email address
      const errorObj = res.body.error.errors;
      expect(res.statusCode).toEqual(400);
      expect(Object.keys(errorObj)).toEqual(['email']); // should return one error for email
      expect(errorObj.email.message).toBe('Provide a proper email address.');
    });

    it('will return user object on successful create', async () => {
      const res = await request(app)
        .post('/api/user')
        .type('form')
        .send({ email: 'newTestUser@test.com', password: 'test' }); // send post with valid email and password
      userID = res.body.user._id; // assign newly created test user id to userID
      expect(res.statusCode).toEqual(201);
      expect(Object.keys(res.body)).toEqual(['user']); // should return new user object
      expect(Object.keys(res.body.user)).toEqual(
        expect.not.arrayContaining(['password'])
      ); // user object should not contain a password
    });

    it('will return error with duplicate email', async () => {
      const res = await request(app)
        .post('/api/user')
        .type('form')
        .send({ email: 'newTestUser@test.com', password: 'test' }); // send post with email created in prior test
      const errorObj = res.body.error.errors;
      expect(res.statusCode).toEqual(400);
      expect(Object.keys(errorObj)).toEqual(['email']); // should return one error for email
      expect(errorObj.email.message).toBe('Email already exists.');
    });
  });
});
