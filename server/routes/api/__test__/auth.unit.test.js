const request = require('supertest');
const app = require('../../../../app');
const User = require('../../../models/user');

describe('POST Auth/Login', () => {
  const existingUserEmail = 'testUser@test.com';

  beforeAll(() => {
    return User.create({ email: existingUserEmail, password: 'test' });
  });

  afterAll(() => {
    return User.findOneAndDelete({ email: existingUserEmail });
  });

  it('will return error with invalid email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .type('form')
      .send({ email: 'invalidEmail@test', password: 'test' }); // send post with invalid invalid email
    expect(res.statusCode).toEqual(400);
    expect(res.body.error.message).toBe(
      'Incorrect email and password combination.'
    );
  });

  it('will return error with invalid password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .type('form')
      .send({ email: existingUserEmail, password: 'wrongPassword' }); // send post with valid/existing email and invalid password
    expect(res.statusCode).toEqual(400);
    expect(res.body.error.message).toBe(
      'Incorrect email and password combination.'
    );
  });

  it('will return user object on successful login', async () => {
    const email = 'testUser@test.com';
    const res = await request(app)
      .post('/api/auth/login')
      .type('form')
      .send({ email: existingUserEmail, password: 'test' }); // send post with valid email and password
    expect(res.statusCode).toEqual(200);
    expect(Object.keys(res.body)).toEqual([
      '_id',
      'email',
      'createdAt',
      'updatedAt',
      '__v'
    ]); // should return user object, without password
    expect(res.body.email).toEqual(email); // returned email should be correct user
  });
});
