import express from "express";
import userRouter from "./user.router";
import courseRouter from "./course.router";

const router = express.Router();

userRouter(router);
courseRouter(router);

export default router;
