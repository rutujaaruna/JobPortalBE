import Joi from "joi";

// Define a schema for LoginForm object
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Invalid Email",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

// Define a schema for RegistrationForm object
export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Invalid Email",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
  confirmPassword: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});
