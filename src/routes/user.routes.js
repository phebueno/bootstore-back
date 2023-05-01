import { Router } from "express";
import { login, register } from "../controllers/loginController.js";
import schemaValidation from "../middlewares/schemaValidation.middleware.js";
import { loginSchema, registerSchema } from "../schemas/login.schema.js";

const userRouter = Router()

userRouter.post("/sign-up", schemaValidation(registerSchema), register)
userRouter.post("/sign-in", schemaValidation(loginSchema), login)

export default userRouter