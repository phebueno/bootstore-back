import { Router } from "express";
import { addCartProduct, checkoutCart, deleteCartProduct, getCart, saveCart } from "../controllers/cart.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { validateArrayProducts, validateCheckout, validateProductDB, validateProductSchema } from "../middlewares/cartValidation.middleware.js";
import { cartCheckoutArraySchema, cartCheckoutSchema, cartProductSchema, cartUpdateSchema } from "../schemas/cart.schemas.js";

const cartRouter = Router();

cartRouter.use(authValidation);
cartRouter.post("/cart/:productId", validateProductSchema(cartProductSchema),validateProductDB, addCartProduct);
cartRouter.delete("/cart/:productId", validateProductSchema(cartProductSchema), deleteCartProduct);
cartRouter.get("/cart", getCart);
cartRouter.put("/cart", validateArrayProducts(cartUpdateSchema), saveCart);
cartRouter.post("/checkout", validateArrayProducts(cartCheckoutArraySchema), validateCheckout(cartCheckoutSchema), checkoutCart);


export default cartRouter;