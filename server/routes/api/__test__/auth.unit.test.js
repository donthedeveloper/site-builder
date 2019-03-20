const request = require('supertest');
const app = require('../../../../app');
const User = require('../../../models/user');

describe('Auth Routes', () => {
  const existingUserEmail = 'testUser@test.com';

  beforeAll(() => User.create({ email: existingUserEmail, password: 'test' }));

  afterAll(() => User.findOneAndDelete({ email: existingUserEmail }));

  describe('POST Auth/Login', () => {
    it('will return error with invalid email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .type('form')
        .send({ email: 'invalidEmail@test', password: 'test' }); // send post with invalid invalid email
      expect(res.statusCode).toEqual(400);
      expect(res.body.error.message).toBe('Incorrect email and password combination.');
    });

    it('will return error with invalid password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .type('form')
        .send({ email: existingUserEmail, password: 'wrongPassword' }); // send post with valid/existing email and invalid password
      expect(res.statusCode).toEqual(400);
      expect(res.body.error.message).toBe('Incorrect email and password combination.');
    });

    it('will return user object on successful login', async () => {
      const email = 'testUser@test.com';
      const res = await request(app)
        .post('/api/auth/login')
        .type('form')
        .send({ email: existingUserEmail, password: 'test' }); // send post with valid email and password
      expect(res.statusCode).toEqual(200);
      expect(Object.keys(res.body)).toEqual(['_id', 'email', 'createdAt', 'updatedAt', '__v']); // should return user object, without password
      expect(res.body.email).toEqual(email); // returned email should be correct user
    });
  });

  describe('GET Auth/Reset', () => {
    let user;
    beforeAll(async () => {
      await request(app)
        .post('/api/auth/forgot')
        .type('form')
        .send({ email: existingUserEmail });
      user = await User.findOne({ email: existingUserEmail }).exec();
    });

    it('will return an error with no token', async () => {
      const res = await request(app).get('/api/auth/reset/');
      expect(res.statusCode).toEqual(404);
    });

    it('will return an error with invalid token', async () => {
      const res = await request(app).get('/api/auth/reset/1234');
      expect(res.statusCode).toEqual(401);
      expect(res.text).toMatch('Invalid or expired token');
    });

    it('will return user object with valid token', async () => {
      const { token } = user.resetPassword;
      const res = await request(app).get(`/api/auth/reset/${token}`);
      expect(res.statusCode).toEqual(200);
      expect(Object.keys(res.body)).toEqual([
        'resetPassword',
        '_id',
        'email',
        'createdAt',
        'updatedAt',
        '__v',
      ]);
    });

    it('will return an error with an expired token', async () => {
      // set token past expiry
      user.resetPassword.expiration -= 3600001;
      await user.save();

      const expiredToken = user.resetPassword.token;
      const res = await request(app).get(`/api/auth/reset/${expiredToken}`);
      expect(res.statusCode).toEqual(401);
      expect(res.text).toMatch('Invalid or expired token');
    });
  });
});
