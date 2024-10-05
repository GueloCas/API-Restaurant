"use strict"

import Joi from "joi";
/**
 * Esquema de validación para el cuerpo de la solicitud de usuario.
 * @constant {Object}
 */

const menuCategoryBodySchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "El nombre de la categoría no puede estar vacío.",
    "any.required": "El nombre de la categoría es obligatorio.",
    "string.base": "El nombre de la categoría debe ser de tipo string.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

export default menuCategoryBodySchema;

