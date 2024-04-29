import supertest from 'supertest';
import app from "../../app.js";

const request = supertest(app);

describe('loginController', () => {
  test('Should fail if the request does not contain a valid email and password', async () => {
    const userData = {
      email: "invalidUser@example.com",
      password: "invalidPassword123"
    };

    const response = await request
      .post('/api/test/log-in-mock')
      .send({ user: userData });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toBe('User not found');
  });

  test('Should fail if the request contain an empty password', async () => {
    const userData = {
      email: "jane@example.com",
      password: ""
    };

    const response = await request
      .post('/api/test/log-in-mock')
      .send({ user: userData });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('BAD REQUEST: Email and password are required.');
  });

  test('Should fail if the request does not contain a valid password', async () => {
    const userData = {
      email: "jane@example.com",
      password: "invalidPassword123"
    };

    const response = await request
      .post('/api/test/log-in-mock')
      .send({ user: userData });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toBe('Incorrect password');
  });

  test('Should pass if the request contain a valid email and password', async () => {
    const userData2 = {
      email: "john@example.com",
      password: "password123" 
    };

    const response = await request
      .post('/api/test/log-in-mock')
      .send({ user: userData2 });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.msg).toBe('Login successful');
  });
});

// Bugs
// 1 - Should fail if the request is given with a empty object
