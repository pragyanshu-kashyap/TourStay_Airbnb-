// scripts/removeBrokenReviewRefs.js
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const Review = require("../models/review");

async function removeBrokenReviewRefs() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

  // Get all valid review IDs
  const validReviewIds = (await Review.find({}, "_id")).map((r) =>
    r._id.toString()
  );

  // Get all listings
  const listings = await Listing.find({});

  let updatedCount = 0;

  for (let listing of listings) {
    const originalLength = listing.reviews.length;
    // Filter out invalid review IDs
    listing.reviews = listing.reviews.filter((id) =>
      validReviewIds.includes(id.toString())
    );
    if (listing.reviews.length !== originalLength) {
      await listing.save();
      updatedCount++;
    }
  }

  console.log(
    `Updated ${updatedCount} listings to remove broken review references.`
  );
  mongoose.disconnect();
}

removeBrokenReviewRefs();
