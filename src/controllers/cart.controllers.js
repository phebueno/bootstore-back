import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";

//Validar se ID do produto existe?

export async function addCartProduct(req, res) {
  const productId = req.params.productId;
  const session = res.locals.session;
  try {
    const productCartExists = await db.collection("carts").findOne({
      userId: session.userId,
      "productIdList.productId": productId,
    });
    if (productCartExists) {
      //Adiciona um item ao carrinho
      await db
        .collection("carts")
        .updateOne(
          { userId: session.userId, "productIdList.productId": productId },
          { $inc: { "productIdList.$.qty": 1 } }
        );
    } else {
      //Cria o item no carrinho
      await db
        .collection("carts")
        .updateOne(
          { userId: session.userId },
          { $addToSet: { productIdList: { productId, qty: 1 } } }
        );
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
    const product = await db.collection("carts").findOne({
      userId: session.userId,
      "productIdList.productId": productId,
    });
    if (!product)
      return res.status(404).send("O item não está no seu carrinho!");
    const delProduct = await db
      .collection("carts")
      .updateOne(
        { userId: session.userId, "productIdList.productId": productId },
        { $pull: { productIdList: { productId } } }
      );
    if (delProduct.matchedCount === 1 && delProduct.modifiedCount === 0) {
      return res.status(404).send("O item não está presente no seu carrinho!");
    }
    res.send("Item deletado do carrinho!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getCart(req, res) {
  const session = res.locals.session;
  try {
    const cart = await db
      .collection("carts")
      .findOne({ userId: session.userId });
    const prodListObjectId = cart.productIdList.map(
      (id) => new ObjectId(id.productId)
    );
    const cartProducts = await db
      .collection("products")
      .find({ _id: { $in: prodListObjectId } })
      .toArray();

    //Junta o objeto do produto com a respectiva quantidade
    let productQty = [];
    for (let i = 0; i < cartProducts.length; i++) {
      productQty.push({
        ...cartProducts[i],
        ...cart.productIdList.find(
          (itmInner) => itmInner.productId === cartProducts[i]._id.toString()
        ),
      });
    }
    res.send(productQty);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function saveCart(req, res) {
  const session = res.locals.session;
  const { productIdList } = req.body;
  try {
    await db
      .collection("carts")
      .updateOne({ userId: session.userId }, { $set: {productIdList} });
    res.send("Carrinho atualizado com sucesso!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function checkoutCart(req, res) {
  const session = res.locals.session;
  
  try {
    await db
      .collection("carts")
      .updateOne({ userId: session.userId }, { $set: {productIdList} });
    res.send("Carrinho atualizado com sucesso!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}