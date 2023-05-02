import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";

export function validateProductSchema(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.params);

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    next();
  };
}

export async function validateProductDB(req,res,next){
    const productId = new ObjectId(req.params.productId);
    try {
        const productExists = await db.collection("products").findOne({_id:productId});
        if(!productExists) return res.status(404).send("Produto não encontrado!");
        next();
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export function validateArrayProducts(schema){
  return (req, res, next) => {
    const validation = schema.validate(req.body.productIdList);

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    next();
  };
}
