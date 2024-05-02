import supertest from "supertest";
import app from "../../app.js";

// tested with loginControllerMock.js because we are not testing the real DB and neither the bycryt dependenci only de loginController code
const request = supertest(app);

describe("loginController", () => {
  test("Should fail if the request does not contain a valid email and password", async () => {
    const userData = {
      email: "invalidUser@example.com",
      password: "invalidPassword123",
    };

    const response = await request
      .post("/api/test/log-in-mock")
      .send({ user: userData });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toBe(
      "No user was found associated with the provided email address. Please verify your email and try again or register if you are a new user."
    );
  });

  test("Should fail if the request contain an empty password", async () => {
    const userData = {
      email: "jane@example.com",
      password: "",
    };

    const response = await request
      .post("/api/test/log-in-mock")
      .send({ user: userData });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(
      "BAD REQUEST: Email and password are required."
    );
  });

  test("Should fail if the request does not contain a valid password", async () => {
    const userData = {
      email: "jane@example.com",
      password: "invalidPassword123",
    };

    const response = await request
      .post("/api/test/log-in-mock")
      .send({ user: userData });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toBe(
      "The password provided is incorrect. Please verify your password and try again."
    );
  });

  test("Should fail if the request is given with a empty object", async () => {
    const response = await request
      .post("/api/test/log-in-mock")
      .send({ user: null });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toBe("Invalid request body");
  });

  test("Should fail if the request contain a invalid fields", async () => {
    const userData = {
      name: "Jane",
      email: "jane@example.com",
      password: "password123",
    };

    const response = await request
      .post("/api/test/log-in-mock")
      .send({ user: userData });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(
      "BAD REQUEST: Invalid fields present in the request."
    );
  });

  test("Should pass if the request contain a valid password and email", async () => {
    const userData = {
      email: "jane@example.com",
      password: "password123",
    };

    const response = await request
      .post("/api/test/log-in-mock")
      .send({ user: userData });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.msg).toBe("Login successful");
  });
});
