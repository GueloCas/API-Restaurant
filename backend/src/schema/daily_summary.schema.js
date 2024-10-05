"use strict"

import Joi from "joi";

const dailySummaryBodySchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "El nombre del resumen diario no puede estar vacío.",
        "any.required": "El nombre del resumen diario es obligatorio.",
        "string.base": "El nombre del resumen diario debe ser de tipo string.",
    }),
    total_sales: Joi.number().required().messages({
        "number.base": "El total de ventas debe ser un número.",
        "any.required": "El total de ventas es obligatorio.",
    }),
    total_tips: Joi.number().required().messages({
        "number.base": "El total de propinas debe ser un número.",
        "any.required": "El total de propinas es obligatorio.",
    }),
    orders: Joi.array().items(Joi.object({
        order: Joi.string()
            .required()
            .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
            .messages({
                "string.empty": "El id de la orden no puede estar vacío.",
                "any.required": "El id de la orden es obligatorio.",
                "string.base": "El id de la orden debe ser de tipo string.",
            }),
        total: Joi.number().required().messages({
            "number.base": "El total de la orden debe ser un número.",
            "any.required": "El total de la orden es obligatorio.",
        }),
        tip: Joi.number().required().messages({
            "number.base": "La propina de la orden debe ser un número.",
            "any.required": "La propina de la orden es obligatoria.",
        }),
    })).required().messages({
        "array.base": "El array de ordenes debe ser de tipo array.",
        "any.required": "El array de ordenes es obligatorio.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

export default dailySummaryBodySchema;