import joi from "joi";

export const cartProductSchema = joi.object({
    productId:joi.string().hex().length(24).required()
});