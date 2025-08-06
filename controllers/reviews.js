const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js"); // importing the Listing model to find the listing by id

module.exports.createReview = async (req, res, next) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
      throw new ExpressError(404, "Listing not found");
    }
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id; // this will set the author of the review to the current user , who is logged in and writing the review
    listing.reviews.push(newReview);
    
    await newReview.save();
    await listing.save();
    req.flash("success", "Review added successfully !!"); // this will flash a success message to the user after adding the review.
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    let result = await Review.findByIdAndDelete(reviewId); // yha pe hum Review model ka findByIdAndDelete method use krke particular review ko delete krenge review collection se by its particular ObjectId . // iss line se review collection se particular review  delete toh ho jayega but iske baad listings collection k reviews array se bhi us review ko delete krena hoga joki niche line pe hua hai

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //ye line se hm Listing collection k reviews array se reviewId ko delete krenge by reference(by the help of Object Id) with the help of $pull operator , it is used to remove an item from an array that matches a specified condition. In this case, it removes the review with the given reviewId from the reviews array of the listing .

    // console.log(result);
    req.flash("deletesuccess", "Review deleted successfully !!"); // this will flash a success message to the user after deleting the review.

    res.redirect(`/listings/${id}`); // after deleting the review, we will redirect to the particular listing page
};
