import { celebrate, Joi, Segments } from "celebrate";

export const registerValidator = () =>
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(3).max(40).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(100).required(),
      role: Joi.required().valid("admin", "member"),
    }),
  });

export const loginValidator = () =>
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(100).required(),
    }),
  });
