import mongoose from 'mongoose';
import Listing from '../models/listing.js';
import Data from './data.js';

const MONGO_URL = 'mongodb://127.0.0.1:27017/LodgeLink';
main()
  .then(() => {
    console.log('✅ Connection Successfull');
  })
  .catch((err) => {
    console.log('❌ Connection Not Successfull', err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

Listing.insertMany(Data);

// import mongoose from 'mongoose';
// import User from '../models/user.js';
// import Review from '../models/review.js';

// const MONGO_URL = 'mongodb://127.0.0.1:27017/LodgeLink';

// async function main() {
//   await mongoose.connect(MONGO_URL);
//   console.log('✅ Connected to DB');

//   const user = await User.findOne({ username: 'random1' });
//   if (!user) {
//     console.log('❌ No user found to assign as author.');
//     return;
//   }

//   const result = await Review.updateMany(
//     {}, // 🔄 No condition => all reviews
//     { $set: { author: user._id } }
//   );

//   console.log(
//     `✅ Updated ${result.modifiedCount} reviews with author: ${user._id}`
//   );

//   await mongoose.disconnect();
// }

// main().catch((err) => console.error('❌ Error:', err));
