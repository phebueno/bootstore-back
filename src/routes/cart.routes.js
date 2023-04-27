import { Router } from "express";
import { addCartProduct, deleteCartProduct, getCart } from "../controllers/cart.controllers.js";

const cartRouter = Router();

cartRouter.post("/cart/:productId", addCartProduct);
cartRouter.delete("/cart/:productId", deleteCartProduct);
cartRouter.get("/cart", getCart);

export default cartRouter;