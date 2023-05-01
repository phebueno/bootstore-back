import joi from "joi";

export const cartProductSchema = joi.object({
    productId:joi.string().hex().length(24).required()
});

export const cartUpdateSchema = joi.array().items(joi.object({
    productId:joi.string().hex().length(24).required(),
    qty:joi.number().positive().greater(0).required()
}));