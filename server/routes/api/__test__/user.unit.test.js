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
    it('will return error without payload', async () => {
      const res = await request(app)
        .post('/api/user')
        .type('form');
      const errorObj = res.body.error.errors;
      expect(res.statusCode).toEqual(400);
      expect(Object.keys(errorObj).length).toEqual(2);
      expect(Object.keys(errorObj)).toEqual(
        expect.arrayContaining(['email', 'password'])
      );
      expect(errorObj.email.message).toBe('You must provide an email address.');
      expect(errorObj.password.message).toBe('You must provide a password.');
    });

    it('will return error without an email', async () => {
      const res = await request(app)
        .post('/api/user')
        .type('form')
        .send('password=test');

      const errorObj = res.body.error.errors;
      expect(res.statusCode).toEqual(400);
      expect(Object.keys(errorObj).length).toEqual(1);
      expect(Object.keys(errorObj)).toEqual(expect.arrayContaining(['email']));
      expect(errorObj.email.message).toBe('You must provide an email address.');
    });

    it('return error without a password', async () => {
      const res = await request(app)
        .post('/api/user')
        .type('form')
        .send('email=example@test.com');

      const errorObj = res.body.error.errors;
      expect(res.statusCode).toEqual(400);
      expect(Object.keys(errorObj).length).toEqual(1);
      expect(Object.keys(errorObj)).toEqual(
        expect.arrayContaining(['password'])
      );
      expect(errorObj.password.message).toBe('You must provide a password.');
    });

    it('will return error with invalid email', async () => {
      const res = await request(app)
        .post('/api/user')
        .type('form')
        .send('email=test@test')
        .send('password=test');

      const errorObj = res.body.error.errors;
      expect(res.statusCode).toEqual(400);
      expect(Object.keys(errorObj).length).toEqual(1);
      expect(Object.keys(errorObj)).toEqual(expect.arrayContaining(['email']));
      expect(errorObj.email.message).toBe('Provide a proper email address.');
    });

    it('will return error with duplicate email', async () => {
      const res = await request(app)
        .post('/api/user')
        .type('form')
        .send('email=test@test.com')
        .send('password=test');

      const errorObj = res.body.error.errors;
      expect(res.statusCode).toEqual(400);
      expect(Object.keys(errorObj).length).toEqual(1);
      expect(Object.keys(errorObj)).toEqual(expect.arrayContaining(['email']));
      expect(errorObj.email.message).toBe('Email already exists.');
    });

    it('will return user object on successful create', async () => {
      const res = await request(app)
        .post('/api/user')
        .type('form')
        .send('email=newTestUser@test.com')
        .send('password=test');

      userID = res.body.user._id;
      expect(res.statusCode).toEqual(201);
      expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['user']));
      expect(Object.keys(res.body.user)).toEqual(
        expect.not.arrayContaining(['password'])
      );
    });
  });
});
