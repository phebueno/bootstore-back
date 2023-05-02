import joi from "joi";

export const cartProductSchema = joi.object({
    productId:joi.string().hex().length(24).required()
});

export const cartUpdateSchema = joi.array().items(joi.object({
    productId:joi.string().hex().length(24).required(),
    qty:joi.number().positive().greater(0).required()
}));

export const cartCheckoutArraySchema = joi.array().items(joi.object({
    name:joi.string().required(),
    productId:joi.string().hex().length(24).required(),
    value: joi.number().precision(2).sign("positive").strict().required(),
    qty:joi.number().positive().greater(0).required()
}));

export const cartCheckoutSchema = joi.object({
    address:joi.string().required(),
    total: joi.number().precision(2).sign("positive").strict().required()
});