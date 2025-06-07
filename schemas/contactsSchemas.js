import Joi from "joi";

const phoneRegexp = /^\+?[\d\s\-()]{7,20}$/;

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 3 characters long",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email",
    "string.empty": "Email cannot be empty",
  }),
  phone: Joi.string()
    .pattern(phoneRegexp)
    .custom((value, helpers) => {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 7) {
        return helpers.error("string.minDigits");
      }
      return value;
    })
    .required()
    .messages({
      "any.required": "Phone is required",
      "string.empty": "Phone cannot be empty",
      "string.pattern.base": "Phone must be a valid phone number",
      "string.minDigits": "Phone must contain at least 7 digits",
    }),
  favorite: Joi.boolean().optional().messages({
    "boolean.base": "Favorite must be a boolean value",
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).messages({
    "string.min": "Name must be at least 3 characters long",
  }),
  email: Joi.string().email().messages({
    "string.email": "Email must be a valid email",
  }),
  phone: Joi.string()
    .pattern(phoneRegexp)
    .custom((value, helpers) => {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 7) {
        return helpers.error("string.minDigits");
      }
      return value;
    })
    .messages({
      "string.pattern.base": "Phone must be a valid phone number",
      "string.minDigits": "Phone must contain at least 7 digits",
      "string.pattern.base": "Phone must be a valid phone number",
    }),
  favorite: Joi.boolean().optional().messages({
    "boolean.base": "Favorite must be a boolean value",
  }),
})
  .min(1)
  .messages({
    "object.min": "Body must have at least one field",
  });
