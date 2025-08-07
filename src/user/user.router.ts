import { Router } from "express";
import { login, signup } from "./user.controller";

const UserRouter = Router()

UserRouter.post('/signup', signup)
UserRouter.post('/login', login)

export default UserRouter