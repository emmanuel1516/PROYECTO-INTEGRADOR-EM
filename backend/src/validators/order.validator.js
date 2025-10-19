import Joi from "joi";
import { validateSchema } from "./validator.js";

const consumerSchema = Joi.object({
    name: Joi
        .string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.empty": "El nombre es obligatorio",
            "string.min": "El nombre debe tener al menos 2 caracteres",
            "string.max": "El nombre no puede exceder 50 caracteres",
            "any.required": "El nombre es obligatorio",
        }),

    surname: Joi
        .string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.empty": "El apellido es obligatorio",
            "string.min": "El apellido debe tener al menos 2 caracteres",
            "string.max": "El apellido no puede exceder 50 caracteres",
            "any.required": "El apellido es obligatorio",
        }),

    email: Joi.string()
        .trim()
        .pattern(/^[a-z0-9.]+@[a-z0-9-]+\.(com$|com\.[a-z0-9]{2}$)/)
        .required()
        .messages({
            "string.empty": "El email es obligatorio",
            "string.pattern.base": "El email debe ser válido",
            "any.required": "El email es obligatorio",
        }),

    phone: Joi
        .string()
        .trim()
        .pattern(/^[0-9+\-\s()]+$/)
        .min(7)
        .max(20)
        .required()
        .messages({
            "string.empty": "El teléfono es obligatorio",
            "string.pattern.base": "El teléfono debe contener solo números y caracteres válidos",
            "string.min": "El teléfono debe tener al menos 7 caracteres",
            "string.max": "El teléfono no puede exceder 20 caracteres",
            "any.required": "El teléfono es obligatorio",
        }),
});

const itemSchema = Joi.object({
    id: Joi
        .alternatives(Joi.string(), Joi.number())
        .required()
        .messages({
            "any.required": "El ID del producto es obligatorio",
        }),

    name: Joi
        .string()
        .required()
        .messages({
            "string.base": "El nombre del producto debe ser un texto",
            "any.required": "El nombre del producto es obligatorio",
        }),

    quantity: Joi
        .number()
        .integer()
        .min(1)
        .required()
        .messages({
            "number.base": "La cantidad debe ser un número",
            "number.integer": "La cantidad debe ser un número entero",
            "number.min": "La cantidad debe ser al menos 1",
            "any.required": "La cantidad es obligatoria",
        }),
    price: Joi
        .number()
        .precision(2)
        .min(0)
        .required()
        .messages({
            "number.base": "El precio debe ser un número",
            "number.precision": "El precio debe tener como máximo 2 decimales",
            "number.min": "El precio no puede ser negativo",
            "any.required": "El precio es obligatorio",
        }),
    amount: Joi
        .number()
        .precision(2)
        .min(0)
        .optional()
        .messages({
            "number.base": "El monto debe ser un número",
            "number.precision": "El monto debe tener como máximo 2 decimales",
            "number.min": "El monto no puede ser negativo",
        }),
    thumbnail: Joi
        .string()
        .uri()
        .optional()
        .messages({
            "string.base": "La miniatura debe ser un texto",
            "string.uri": "La miniatura debe ser una URL válida",
        }),
});

const orderSchema = Joi.object({
    consumer: consumerSchema
        .required()
        .messages({
            "any.required": "Los datos del consumidor son obligatorios",
        }),
    items: Joi
        .array()
        .items(itemSchema)
        .min(1)
        .required()
        .messages({
            "array.base": "Los items deben ser un arreglo",
            "array.min": "Debe haber al menos un item en la orden",
            "any.required": "Los items son obligatorios",
        }),
    totalQuantity: Joi
        .number()
        .integer()
        .min(1)
        .required()
        .messages({
            "number.base": "La cantidad total debe ser un número",
            "number.integer": "La cantidad total debe ser un número entero",
            "number.min": "La cantidad total debe ser al menos 1",
            "any.required": "La cantidad total es obligatoria",
        }),
    totalAmount: Joi
        .number()
        .precision(2)
        .min(0)
        .required()
        .messages({
            "number.base": "El monto total debe ser un número",
            "number.precision": "El monto total debe tener como máximo 2 decimales",
            "number.min": "El monto total no puede ser negativo",
            "any.required": "El monto total es obligatorio",
        }),
});

export const validateSendOrder = (data) => validateSchema(orderSchema, data);