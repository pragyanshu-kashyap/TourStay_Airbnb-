const express = require("express");
const review = express.Router({ mergeParams: true }); // mergeParams is used to merge the params of the parent route (listings/:id) with the child route (reviews) or yaha pe humne review router ko mergeParams ke sath use kiya hai, taaki hum parent route se params ko access kar sakein, jaise ki listings/:id route se id ko access kar sakein.

//yaha pe review child route hai jo ki listing ke andar aata hai

const Listing = require("../models/listing.js");

const wrapAsync = require("../utils/wrapAsync.js"); // this is used to wrap async functions to handle errors
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const { validateReview } = require("../middleware.js"); // importing the middleware function to validate the review data coming from the form



//reviews post route , here validateReview middleware is used to validate server side using jOI
review.post(
  "/",
  validateReview,
  wrapAsync(async (req, res, next) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
      throw new ExpressError(404, "Listing not found");
    }
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Review added successfully !!"); // this will flash a success message to the user after adding the review.
    res.redirect(`/listings/${listing._id}`);
  })
);

//reviews delete route
review.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    let result = await Review.findByIdAndDelete(reviewId); // yha pe hum Review model ka findByIdAndDelete method use krke particular review ko delete krenge review collection se by its particular ObjectId . // iss line se review collection se particular review  delete toh ho jayega but iske baad listings collection k reviews array se bhi us review ko delete krena hoga joki niche line pe hua hai

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //ye line se hm Listing collection k reviews array se reviewId ko delete krenge by reference(by the help of Object Id) with the help of $pull operator , it is used to remove an item from an array that matches a specified condition. In this case, it removes the review with the given reviewId from the reviews array of the listing .

    // console.log(result);
    req.flash("deletesuccess", "Review deleted successfully !!"); // this will flash a success message to the user after deleting the review.

    res.redirect(`/listings/${id}`); // after deleting the review, we will redirect to the particular listing page
  })
);

// review.set("view engine", "ejs");  // this line is used to set the view engine to ejs, so that we can use ejs templates in our views folder.

// review.set("views", path.join(__dirname, "views")); // this line is used to set the views folder path, so that express can find the ejs templates in the views folder.

// review.use(express.urlencoded({ extended: true })); // this line is used to parse the incoming request body, so that we can access the form data in req.body.

// review.use(methodoverride("_method"));//

// review.engine('ejs', ejsMate); // this line is used to use ejsMate as the template engine for ejs, which allows us to use layout files and partials in our ejs templates.

// review.use(express.static(path.join(__dirname, "/public"))); // to use the static files from the public folder

// main()
//   .then(() => console.log("Connected to MongoDB database"))
//   .catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
// }

// Note: The old EJS routes are commented out since we're now using React frontend
// review.get("/listings", wrapAsync(async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render("listings/index.ejs", { allListings });
// }));

// review.get("/listings/:id", wrapAsync(async (req, res) => {
//   const listing = await Listing.findById(req.params.id);
//   res.render("listings/show.ejs", { listing });
// }));

module.exports = review;
