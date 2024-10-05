"use strict";

import Joi from "joi";

const tableBodySchema = Joi.object({
    number: Joi.number().required().messages({
        "any.required": "El número de mesa es requerido",
        "number.base": "El número de mesa debe ser un número",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

export { tableBodySchema };