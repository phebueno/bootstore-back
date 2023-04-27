import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";

//Valor placeholder, deve passar pela validação para pegar o valor do usuário:
const user = {
  _id: "154654d0zgrzd504zsd5rfernando",
  name: "fernando",
};
//Validar se ID do produto existe?

export async function addCartProduct(req, res) {
  const productId = req.params.productId;

  try {
    const newProduct = await db
      .collection("carts")
      .updateOne(
        { userId: user._id },
        { $addToSet: { productIdList: productId } },
        { upsert: true }
      );
    console.log(newProduct);
    if (newProduct.matchedCount === 1 && newProduct.modifiedCount === 0) {
      return res.status(409).send("O item já está presente no seu carrinho!");
    }
    res.send("Item adicionado ao carrinho!");
  } catch (err) {
    console.log(err);
  }
}

export async function deleteCartProduct(req, res) {
  const productId = req.params.productId;

  try {
    const product = await db
      .collection("carts")
      .findOne({ userId: user._id, productIdList: productId });
    if (!product)
      return res.status(404).send("O item não está no seu carrinho!");
    const delProduct = await db
      .collection("carts")
      .updateOne({ userId: user._id }, { $pull: { productIdList: productId } });

    console.log(delProduct);
    if (delProduct.matchedCount === 1 && delProduct.modifiedCount === 0) {
      return res.status(404).send("O item não está presente no seu carrinho!");
    }
    if (product.productIdList.length === 1 && delProduct.matchedCount === 1) {
      await db.collection("carts").deleteOne({ userId: user._id });
    }

    res.send("Item deletado do carrinho!");
  } catch (err) {
    console.log(err);
  }
}

export async function getCart(req, res) {
  try {
    const cart = await db.collection("carts").findOne({ userId: user._id });
    const prodListObjectId = cart.productIdList.map((id) => new ObjectId(id));
    //TROCAR COLLECTION PARA PRODUCTS
    const cartProducts = await db
      .collection("teste")
      .find({ _id: { $in: prodListObjectId } })
      .toArray();
      res.send(cartProducts);
  } catch (err) {
    console.log(err);
  }
  
}
