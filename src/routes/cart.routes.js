import { Router } from "express";
import { addCartProduct, deleteCartProduct, getCart, saveCart } from "../controllers/cart.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { validateArrayProducts, validateProductDB, validateProductSchema } from "../middlewares/cartValidation.middleware.js";
import { cartProductSchema, cartUpdateSchema } from "../schemas/cart.schemas.js";

const cartRouter = Router();

cartRouter.use(authValidation);
cartRouter.post("/cart/:productId", validateProductSchema(cartProductSchema),validateProductDB, addCartProduct);
cartRouter.delete("/cart/:productId", validateProductSchema(cartProductSchema), deleteCartProduct);
cartRouter.get("/cart", getCart);
cartRouter.put("/cart", validateArrayProducts(cartUpdateSchema), saveCart);

export default cartRouter;