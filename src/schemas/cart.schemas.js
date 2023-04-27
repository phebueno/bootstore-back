import joi from "joi";

export const cartProductSchema = joi.object({
    userId:joi.string().hex().length(24).required(),
    productId:joi.string().hex().length(24).required()
});