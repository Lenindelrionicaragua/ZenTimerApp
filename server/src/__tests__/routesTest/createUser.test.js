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

const testUserBase = { name: "John", email: "john@doe.com", password: "sodaStereo", dateOfBirth: "Tue Feb 01 2022" };

describe("POST /api/auth/sign-up", () => {
  it("Should return a bad request if no user object is given", (done) => {
    request
      .post("/api/auth/sign-up")
      .then((response) => {
        expect(response.status).toBe(400);

        const { body } = response;
        expect(body.success).toBe(false);
        // Check that there is an error message
        expect(body.msg.length).not.toBe(0);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return a bad request if the user object does not have a name", (done) => {
    const testUser = { email: testUserBase.email };

    request
      .post("/api/auth/sign-up")
      .send({ user: testUser })
      .then((response) => {
        expect(response.status).toBe(400);

        const { body } = response;
        expect(body.success).toBe(false);
        // Check that there is an error message
        expect(body.msg.length).not.toBe(0);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return a bad request if the user object does not have an email", (done) => {
    const testUser = { name: testUserBase.name };

    request
      .post("/api/auth/sign-up")
      .send({ user: testUser })
      .then((response) => {
        expect(response.status).toBe(400);

        const { body } = response;
        expect(body.success).toBe(false);
        // Check that there is an error message
        expect(body.msg.length).not.toBe(0);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return a bad request if the user object has extra fields", (done) => {
    const testUser = { ...testUserBase, foo: "bar" };

    request
      .post("/api/auth/sign-up")
      .send({ user: testUser })
      .then((response) => {
        expect(response.status).toBe(400);

        const { body } = response;
        expect(body.success).toBe(false);
        // Check that there is an error message
        expect(body.msg.length).not.toBe(0);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
