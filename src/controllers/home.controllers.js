import { db } from "../database/database.connection.js";

export async function listAllProducts(req, res) {
  try {
    const allProducts = await db.collection("products").find().toArray();
    res.send(allProducts);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function listCategoryProducts(req, res) {
  const { category } = req.params;

  try {
    const filteredProducts = await db
      .collection("products")
      .find({ category })
      .toArray();
    res.send(filteredProducts);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

//Para ajudar a popular o banco de dados
// export async function addProduct(req, res) {
//   const product = req.body;
//   try {
//     await db.collection("products").insertOne(product);
//     res.sendStatus(201);
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// }
