// scripts/cleanReviews.js
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const Review = require("../models/review");

async function cleanReviews() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust"); // Update if your DB URL is different

  // 1. Find reviews missing comment or rating
  const badReviews = await Review.find({
    $or: [{ comment: { $exists: false } }, { rating: { $exists: false } }],
  });

  if (badReviews.length === 0) {
    console.log("No bad reviews found!");
    return mongoose.disconnect();
  }

  console.log(
    "Bad reviews found:",
    badReviews.map((r) => r._id)
  );

  // 2. Remove bad reviews
  await Review.deleteMany({ _id: { $in: badReviews.map((r) => r._id) } });

  // 3. Remove references from listings
  await Listing.updateMany(
    {},
    { $pull: { reviews: { $in: badReviews.map((r) => r._id) } } }
  );

  console.log("Bad reviews and their references removed.");
  mongoose.disconnect();
}

cleanReviews();
