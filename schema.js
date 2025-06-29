import Joi from 'joi';
export const listingSchemaValidate = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  price: Joi.number().required().min(0),
  image: Joi.string().allow('', null),

  category: Joi.string()
    .valid(
      'trending',
      'rooms',
      'iconic',
      'mountains',
      'castles',
      'pools',
      'camping',
      'farms',
      'arctic'
    )
    .required(),
});

export const reviewSchemaValidate = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
