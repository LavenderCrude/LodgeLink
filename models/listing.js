import mongoose, { Schema } from 'mongoose';
import Review from './review.js';
const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 5,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    required: true,
    default: 12000,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

//remove reviews when listing delete
listingSchema.post('findOneAndDelete', async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
