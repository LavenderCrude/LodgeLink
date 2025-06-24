import Listing from '../models/listing.js';
import Review from '../models/review.js';

export const createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  // let { rating, comment } = req.body;
  // let newReview = new Review({
  //   rating,
  //   comment,
  // });
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  const resultReview = await newReview.save();

  listing.reviews.push(newReview);
  const resultListing = await listing.save();
  console.log(resultListing, resultReview);
  req.flash('success', 'Review Added');
  res.redirect(`/listing/${listing._id}`);
};

export const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  //remove and update Deleted Review
  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  const result = await Review.findByIdAndDelete(reviewId);

  console.log(result);
  req.flash('success', 'Review Deleted');
  res.redirect(`/listing/${id}`);
};
