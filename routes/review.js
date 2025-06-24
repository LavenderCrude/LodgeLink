import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { validateReview } from '../middlewares/validate.js';
import { isReviewOwner } from '../middlewares/isOwner.js';
import * as reviewController from '../controllers/reviews.js';

const router = express.Router({ mergeParams: true });

// Create Review
router.post(
  '/',
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// Delete Review
router.delete(
  '/:reviewId',
  isLoggedIn,
  isReviewOwner,
  wrapAsync(reviewController.deleteReview)
);

export default router;
