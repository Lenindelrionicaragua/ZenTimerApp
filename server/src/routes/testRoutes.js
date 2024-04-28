import express from "express";
import { getUsers } from "../controllers/userController.js";
import { loginMock } from "../__testUtils__/loginControllerMock.js";

const testRouter = express.Router();

testRouter.get("/user", getUsers);
testRouter.post("/log-in-mock", loginMock);

export default testRouter;