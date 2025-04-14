const request = require('supertest');
const { app, server } = require('../index.js');
const knex = require('knex')(require('../../knexfile.js')['development']);

const testUser = {
  first_name: 'Kevin',
  last_name: 'Halls',
  rank: 'Sgt',
  email: 'kevin.halls@example.com',
  password: 'badpassword123',
  phone: '1234567890',
  organization: 'Delta 55',
  crew: 'Echo',
  position: 'Supervisor',
  permissions: 'user'
};

describe('User Routes', () => {
  let createdUserId;

  describe('POST /user/', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/user')
        .send(testUser)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'User created');
      const user = await knex('users').where({ email: testUser.email }).first();
      createdUserId = user.id;
    });
  });

  describe('GET /user/', () => {
    it('should return all users', async () => {
      const response = await request(app)
        .get('/user')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /user/:id', () => {
    it('should return a specific user', async () => {
      const response = await request(app)
        .get(`/user/${createdUserId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body[0]).toHaveProperty('id', createdUserId);
      expect(response.body[0]).toHaveProperty('email', testUser.email);
    });
  });

  describe('PATCH /user/:id', () => {
    it('should update a user', async () => {
      const updatedData = { first_name: 'Updated' };
      const response = await request(app)
        .patch(`/user/${createdUserId}`)
        .send(updatedData)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'User updated');
      const updatedUser = await knex('users').where({ id: createdUserId }).first();
      expect(updatedUser.first_name).toBe('Updated');
    });
  });

  describe('POST /user/login', () => {
    it('should login successfully with correct credentials', async () => {
      const response = await request(app)
        .post('/user/login')
        .send({ email: testUser.email, password: testUser.password })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(response.body).toHaveProperty('message', 'Login successful');
      expect(response.body.user).toHaveProperty('email', testUser.email);
    });

    it('should fail with incorrect password', async () => {
      const response = await request(app)
        .post('/user/login')
        .send({ email: testUser.email, password: 'wrongpassword' })
        .expect('Content-Type', /json/)
        .expect(401);
      expect(response.body).toHaveProperty('error', 'Incorrect password');
    });
  });

  describe('DELETE /user/:id', () => {
    it('should delete a user', async () => {
      const response = await request(app)
        .delete(`/user/${createdUserId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'User deleted');
      const user = await knex('users').where({ id: createdUserId }).first();
      expect(user).toBeUndefined();
    });
  });
});