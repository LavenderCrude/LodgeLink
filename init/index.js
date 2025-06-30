import mongoose from 'mongoose';
import Listing from '../models/listing.js';
import Data from './data.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); // Adjust path if .env is one level up

const DB_URL = process.env.ATLASDB_URL;
console.log('DB_URL from .env:', DB_URL);
main()
  .then(() => {
    console.log('✅ Connection Successful');
    return Listing.insertMany(Data);
  })
  .then(() => {
    console.log('📦 Sample data inserted');
  })
  .catch((err) => {
    console.log('❌ Error:', err);
  });

async function main() {
  await mongoose.connect(DB_URL);
}
