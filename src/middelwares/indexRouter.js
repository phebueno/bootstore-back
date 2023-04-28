import { Router } from "express";
import userRouter from "../Routers/userRouter.js";

const router = Router()

//teste

router.use(userRouter)

export default router