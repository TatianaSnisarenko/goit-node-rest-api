import Joi from "joi";

export const authSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email",
    "string.empty": "Email cannot be empty",
  }),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .required()
    .messages({
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 30 characters long",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit",
    }),
});
