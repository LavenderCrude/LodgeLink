import ExpressError from '../utils/ExpressError.js';
import { listingSchemaValidate } from '../schema.js';
import { reviewSchemaValidate } from '../schema.js';

export const validateListing = (req, res, next) => {
  const { error } = listingSchemaValidate.validate(req.body);
  if (error) {
    const Errmsg = error.details.map((el) => el.message).join(', ');
    throw new ExpressError(400, Errmsg);
  } else {
    next();
  }
};

export const validateReview = (req, res, next) => {
  const { error } = reviewSchemaValidate.validate(req.body);
  if (error) {
    const Errmsg = error.details.map((el) => el.message).join(', ');
    throw new ExpressError(400, Errmsg);
  } else {
    next();
  }
};
