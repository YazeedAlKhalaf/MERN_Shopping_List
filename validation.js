const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})";
  const registerSchema = Joi.object({
    firstName: Joi.string().min(6).max(255).required(),
    lastName: Joi.string().min(6).max(255).required(),
    username: Joi.string().min(4).max(16).required(),
    email: Joi.string().email().max(350).required(),
    password: Joi.string().max(1024).required().regex(RegExp(pattern)),
  });
  return registerSchema.validate(data);
};

const loginValidation = (data) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().max(350).required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return loginSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
