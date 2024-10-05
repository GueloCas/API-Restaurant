"use strict"

import Joi from "joi";

const menuBodySchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "El nombre del menú no puede estar vacío.",
        "any.required": "El nombre del menú es obligatorio.",
        "string.base": "El nombre del menú debe ser de tipo string.",
    }),
    categoryId: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            "string.empty": "El id de la categoría no puede estar vacío.",
            "any.required": "El id de la categoría es obligatorio.",
            "string.base": "El id de la categoría debe ser de tipo string.",
        }),
    price: Joi.number().required().messages({
        "number.base": "El precio debe ser un número.",
        "any.required": "El precio es obligatorio.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

export default menuBodySchema;


