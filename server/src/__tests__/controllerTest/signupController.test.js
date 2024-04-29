import supertest from 'supertest';
import app from "../../app.js";

const request = supertest(app);

describe('signupController', () => {
    test("Should fail if the request is not a user object", async () => { 
        const response = await request
            .post('/api/auth/sign-up/')
            .send({
                name: "Ma!!!@#$y",
                email: "mary@doe.com",
                password: "sodaStereo",
                dateOfBirth: "Tue Feb 01 2022"
            });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.msg).toBe("You need to provide a 'user' object. Received: undefined");
    })
})
