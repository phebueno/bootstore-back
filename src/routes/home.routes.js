import { Router } from "express";
import {
  listAllProducts,
  listCategoryProducts,
  // addProduct,
} from "../controllers/home.controllers.js";

const homeRouter = Router();

homeRouter.get("/home", listAllProducts);
homeRouter.get("/home/:category", listCategoryProducts);

//Para ajudar a popular o banco de dados
// homeRouter.post("/home", addProduct);

export default homeRouter;
