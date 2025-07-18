const express = require("express");
const app = express();
const userrouter = express.Router();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const path = require("path");
const methodoverride = require("method-override"); // this is used to override the default method of form submission, so that we can use PUT and DELETE methods in our forms.
const ejsMate = require("ejs-mate");
const wrapAsync = require("../utils/wrapAsync.js"); // this is used to wrap async functions to handle errors
const Review = require("../models/review.js");
const { reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");



// EJS routes - serve the EJS pages (these must come before API routes)

userrouter.get(
  // this is the route to get all listings
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);


//router to show a particular listing
userrouter.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id).populate("reviews"); //here populate method is being used to populate the reviews array in the listing schema with the actual review documents instead of just their ObjectIds. This allows us to access the review details directly in the listing view. This is the route to get a particular listing by its ObjectId, which will be used as the :id parameter in our listings routes.
    if (!listing) {
      return res
        .status(404)
        .render("listings/404error", { error: "Listing not found" });
    }
    res.render("listings/show.ejs", { listing });
  })
);

//function for the server side validation of the review model , which is to be used as  middleware
const validateReview = (req, res, next) => {
  // Log the entire request body
  console.log("req.body:", req.body);

  // Log the review object specifically
  console.log("req.body.review:", req.body.review);

  if (!req.body.review) {
    throw new ExpressError(400, "Review data is required.");
  }

  // Log what is being sent to Joi
  console.log("Validating with Joi:", req.body.review);

  const { error } = reviewSchema.validate(req.body.review);

  // Log the Joi error, if any
  console.log("Joi validation error:", error);

  if (error) {
    let errorMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errorMsg);
  } else {
    next();
  }
};

//reviews post route , here validateReview middleware is used to validate server side using jOI
userrouter.post(
  "/listings/:id/reviews",
  validateReview,
  wrapAsync(async (req, res, next) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview); //ye line se hm listing k reviews array jo ki listing schema mai mentioned hai , uske andar newReview ko puch krenge by reference(by the help of Object Id)

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
  })
);

//reviews delete route
userrouter.delete("/listings/:id/reviews/:reviewId" , wrapAsync(async(req,res)=>{
  let {id,reviewId} = req.params;

  let result= await Review.findByIdAndDelete(reviewId); // yha pe hum Review model ka findByIdAndDelete method use krke particular review ko delete krenge review collection se by its particular ObjectId . // iss line se review collection se particular review  delete toh ho jayega but iske baad listings collection k reviews array se bhi us review ko delete krena hoga joki upar line pe hua hai


  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})  //ye line se hm Listing collection k reviews array se reviewId ko delete krenge by reference(by the help of Object Id) with the help of $pull operator , it is used to remove an item from an array that matches a specified condition. In this case, it removes the review with the given reviewId from the reviews array of the listing .
  
  // console.log(result);

  
  res.redirect(`/listings/${id}`); // after deleting the review, we will redirect to the particular listing page

}));


// userrouter.set("view engine", "ejs");  // this line is used to set the view engine to ejs, so that we can use ejs templates in our views folder.

// userrouter.set("views", path.join(__dirname, "views")); // this line is used to set the views folder path, so that express can find the ejs templates in the views folder.

// userrouter.use(express.urlencoded({ extended: true })); // this line is used to parse the incoming request body, so that we can access the form data in req.body.

// userrouter.use(methodoverride("_method"));//

// userrouter.engine('ejs', ejsMate); // this line is used to use ejsMate as the template engine for ejs, which allows us to use layout files and partials in our ejs templates.

// userrouter.use(express.static(path.join(__dirname, "/public"))); // to use the static files from the public folder

// API routes - these should come before the catch-all route
userrouter.get(
  // this is the API route to get all listings
  "/api/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.json(allListings);
  })
);

userrouter.get(
  "/api/listings/:id",
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json(listing);
  })
);

// Serve React app from the built dist directory
userrouter.use(express.static(path.join(__dirname, "../frontend/dist")));

// Serve React app for all other routes (SPA routing)
userrouter.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// main()
//   .then(() => console.log("Connected to MongoDB database"))
//   .catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
// }

// Note: The old EJS routes are commented out since we're now using React frontend
// userrouter.get("/listings", wrapAsync(async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render("listings/index.ejs", { allListings });
// }));

// userrouter.get("/listings/:id", wrapAsync(async (req, res) => {
//   const listing = await Listing.findById(req.params.id);
//   res.render("listings/show.ejs", { listing });
// }));

module.exports = userrouter;
