const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/db');
const User = require('../../src/models/user');

describe('Authentication', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  beforeEach(async () => {
    await User.destroy({ truncate: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /register', () => {
    it('should register a user', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'password123',
        });
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('apiKey');
      const user = await User.findByPk(response.body.id);
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john.doe@example.com');
      expect(user.password).not.toBe('password123');
    });
  });

  describe('POST /login', () => {
    beforeEach(async () => {
      await User.create({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '$2a$10$3p71AmYBy4JvV7GMn.6I2e7Dlrj6f2X8WJZ6UuG6UAsw1wSVp8e5y', // hashed 'password123'
      });
    });

    it('should log in a user', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'john.doe@example.com',
          password: 'password123',
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('apiKey');
    });

    it('should return a 401 status code when email is incorrect', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'jane.doe@example.com',
          password: 'password123',
        });
      expect(response.statusCode).toBe(401);
    });

    it('should return a 401 status code when password is incorrect', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'john.doe@example.com',
          password: 'password456',
        });
      expect(response.statusCode).toBe(401);
    });
  });
});
