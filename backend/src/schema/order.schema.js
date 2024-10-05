"use strict"

import Joi from "joi";

const orderBodySchema = Joi.object({
    user: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            "string.empty": "El id del usuario no puede estar vacío.",
            "any.required": "El id del usuario es obligatorio.",
            "string.base": "El id del usuario debe ser de tipo string.",
        }),
    table: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            "string.empty": "El id de la mesa no puede estar vacío.",
            "any.required": "El id de la mesa es obligatorio.",
            "string.base": "El id de la mesa debe ser de tipo string.",
        }),
        number: Joi.number().required().messages({
            "any.required": "El número de orden es requerido",
            "number.base": "El número de orden debe ser un número",
        }),
        items: Joi.array().items(Joi.object({
            menu: Joi.string()
                .required()
                .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
                .messages({
                    "string.empty": "El id del menú no puede estar vacío.",
                    "any.required": "El id del menú es obligatorio.",
                    "string.base": "El id del menú debe ser de tipo string.",
                }),
            quantity: Joi.number().required().messages({
                "number.base": "La cantidad debe ser un número.",
                "any.required": "La cantidad es obligatoria.",
            }),
        })).required().messages({
            "array.base": "El array de items debe ser de tipo array.",
            "any.required": "El array de items es obligatorio.",
        }),
        total: Joi.number().required().messages({
            "number.base": "El total debe ser un número.",
            "any.required": "El total es obligatorio.",
        }),
        tip: Joi.number().required().messages({
            "number.base": "La propina debe ser un número.",
            "any.required": "La propina es obligatoria.",
        }),
        is_active: Joi.boolean().required().messages({
            "boolean.base": "El estado debe ser un boolean.",
            "any.required": "El estado es obligatorio.",
        }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

export default orderBodySchema;