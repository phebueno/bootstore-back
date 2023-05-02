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
