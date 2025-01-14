import Joi from 'joi';

export const createBookValidationSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  publishedYear: Joi.number().required(),
  genres: Joi.array().items(Joi.string()).required(),
  stock: Joi.number().required(),
});

export const getBookByIdValidationSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const updateBookValidationSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  publishedYear: Joi.number().required(),
  genres: Joi.array().items(Joi.string()).required(),
  stock: Joi.number().required(),
});
