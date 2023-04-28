import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";

//Validar se ID do produto existe?

export async function addCartProduct(req, res) {
  const productId = req.params.productId;
  const session = res.locals.session;
  try {
    const newProduct = await db
      .collection("carts")
      .updateOne(
        { userId: session.userId },
        { $addToSet: { productIdList: productId } },
        { upsert: true }
      );
    if (newProduct.matchedCount === 1 && newProduct.modifiedCount === 0) {
      return res.status(409).send("O item já está presente no seu carrinho!");
    }
    res.send("Item adicionado ao carrinho!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteCartProduct(req, res) {
  const productId = req.params.productId;
  const session = res.locals.session;
  try {
    const product = await db
      .collection("carts")
      .findOne({ userId: session.userId, productIdList: productId });
    if (!product)
      return res.status(404).send("O item não está no seu carrinho!");
    const delProduct = await db
      .collection("carts")
      .updateOne({ userId: session.userId }, { $pull: { productIdList: productId } });
    if (delProduct.matchedCount === 1 && delProduct.modifiedCount === 0) {
      return res.status(404).send("O item não está presente no seu carrinho!");
    }
    if (product.productIdList.length === 1 && delProduct.matchedCount === 1) {
      await db.collection("carts").deleteOne({ userId: session.userId });
    }

    res.send("Item deletado do carrinho!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getCart(req, res) {
    const session = res.locals.session;
  try {
    const cart = await db.collection("carts").findOne({ userId: session.userId });
    if(!cart) return res.send([]);
    const prodListObjectId = cart.productIdList.map((id) => new ObjectId(id));
    //TROCAR COLLECTION PARA PRODUCTS
    const cartProducts = await db
      .collection("products")
      .find({ _id: { $in: prodListObjectId } })
      .toArray();
    res.send(cartProducts);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
