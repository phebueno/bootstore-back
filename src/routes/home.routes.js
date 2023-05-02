import { Router } from "express";
import {
  listAllProducts,
  listCategoryProducts,
} from "../controllers/home.controllers.js";

const homeRouter = Router();

homeRouter.get("/home", listAllProducts);
homeRouter.get("/home/:category", listCategoryProducts);

export default homeRouter;
