import Listing from '../models/listing.js';
import Review from '../models/review.js';

export const isListingOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash('error', 'Listing not found.');
    return res.redirect('/listing');
  }

  if (!listing.owner.equals(req.user._id)) {
    req.flash('error', "You don't have permission to make changes.");
    return res.redirect(`/listing/${id}`);
  }

  next();
};

export const isReviewOwner = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review) {
    req.flash('error', 'Review not found.');
    return res.redirect(`/listing/${id}`);
  }

  if (!review.author.equals(req.user._id)) {
    req.flash('error', 'You are not authorized to delete this review.');
    return res.redirect(`/listing/${id}`);
  }

  next();
};
