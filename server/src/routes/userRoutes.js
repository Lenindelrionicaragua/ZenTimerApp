import express from "express";
import { getUsers } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/test/", getUsers);

export default userRouter;