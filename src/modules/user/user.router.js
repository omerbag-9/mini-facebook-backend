import { Router } from "express";
import { login, logout, signup, specificUser } from "./user.controller.js";

const userRouter = Router()

// add User
userRouter.post('/signup',signup)
// login user
userRouter.post('/login',login)
// logout
userRouter.post('/logout',logout)
// specific user
userRouter.get('/:userId/:postId',specificUser)
export default userRouter