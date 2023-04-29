import { Router } from "express";
import cartRouter from "./cart.routes.js";
import userRouter from "./user.routes.js"


const router = Router();
router.use(cartRouter);
router.use(userRouter)

export default router;