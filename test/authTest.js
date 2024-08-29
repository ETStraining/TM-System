import request from 'supertest';
import app from '../server'; // Adjust the path to your server file

describe('Authentication', () => {
  let token;

  test('Signup should create a new user', async () => {
    const response = await request(app)
      .post('/api/v1/signup')
      .send({
        username: 'testuser',
        password: 'password123'
      });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  test('Login should return a token', async () => {
    const response = await request(app)
      .post('/api/v1/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    token = response.body.token;
  });

  test('Protected route should be accessible with token', async () => {
    const response = await request(app)
      .get('/api/v1/protected-route')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  test('Protected route should be denied without token', async () => {
    const response = await request(app)
      .get('/api/v1/protected-route');
    expect(response.status).toBe(403);
  });
});
