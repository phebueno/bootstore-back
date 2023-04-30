import { Router } from "express";
import {
  listAllProducts,
  // addProduct,
} from "../controllers/home.controllers.js";

const homeRouter = Router();

homeRouter.get("/home", listAllProducts);

//Para ajudar a popular o banco de dados
// homeRouter.post("/home", addProduct);

export default homeRouter;
