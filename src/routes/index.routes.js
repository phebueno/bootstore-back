import { Router } from "express";
import cartRouter from "./cart.routes.js";
import userRouter from "./user.routes.js"


const router = Router();

router.use(userRouter)
router.use(cartRouter);

export default router;