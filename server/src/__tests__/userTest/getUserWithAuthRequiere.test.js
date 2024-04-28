import supertest from "supertest";
import {
  connectToMockDB,
  closeMockDatabase,
  clearMockDatabase,
} from "../../__testUtils__/dbMock.js";
import app from "../../app.js";

const request = supertest(app);

beforeAll(async () => {
  await connectToMockDB();
});

afterEach(async () => {
  await clearMockDatabase();
});

afterAll(async () => {
  await closeMockDatabase();
});

describe("Login API Tests", () => {
  it("Should return an error for invalid credentials", async () => {
    // Intentar iniciar sesión con credenciales inválidas
    const invalidCredentials = {
      email: "invalid@example.com",
      password: "wrongpassword",
    };

    const loginResponse = await request
      .post("/api/auth/log-in")
      .send(invalidCredentials);

    // Verificar que la solicitud de inicio de sesión falle con credenciales inválidas
    expect(loginResponse.status).toBe(401);
    expect(loginResponse.body.success).toBe(false);
    expect(loginResponse.body.msg).toBe("User not found");
  });
});
