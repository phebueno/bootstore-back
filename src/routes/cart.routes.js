import { Router } from "express";
import { addCartProduct, deleteCartProduct, getCart } from "../controllers/cart.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { validateProductDB, validateProductSchema } from "../middlewares/cartValidation.middleware.js";
import { cartProductSchema } from "../schemas/cart.schemas.js";

const cartRouter = Router();

cartRouter.use(authValidation);
cartRouter.post("/cart/:productId", validateProductSchema(cartProductSchema),validateProductDB, addCartProduct);
cartRouter.delete("/cart/:productId", validateProductSchema(cartProductSchema), deleteCartProduct);
cartRouter.get("/cart", getCart);

export default cartRouter;