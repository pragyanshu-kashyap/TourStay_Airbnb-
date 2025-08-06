const express = require("express");
const review = express.Router({ mergeParams: true }); // mergeParams is used to merge the params of the parent route (listings/:id) with the child route (reviews) or yaha pe humne review router ko mergeParams ke sath use kiya hai, taaki hum parent route se params ko access kar sakein, jaise ki listings/:id route se id ko access kar sakein.

//yaha pe review child route hai jo ki listing ke andar aata hai


const wrapAsync = require("../utils/wrapAsync.js"); // this is used to wrap async functions to handle errors

const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js"); // importing the middleware function to validate the review data coming from the form

const reviewController = require("../controllers/reviews.js"); // importing the controller functions for reviews


//reviews post route , here validateReview middleware is used to validate server side using jOI
review.post(
  "/",isLoggedIn, // this middleware checks if the user is logged in before allowing them to add a review
  validateReview,
  wrapAsync(reviewController.createReview) // this will create a new review for the listing and save it to the database, and it will check if the data is valid before saving it.
);

//reviews delete route
review.delete(
  "/:reviewId",isLoggedIn, // this middleware checks if the user is logged in before allowing them to delete a review
  isReviewAuthor, // this middleware checks if the current user is the author of the review before allowing them to delete it
  wrapAsync(reviewController.destroyReview) // this will delete the review from the database and redirect to the listing page, and it will check if the user is the author of the review before deleting it.
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
