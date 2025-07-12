const express = require("express");
const app = express();
const userrouter = express.Router();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const path = require("path");
const methodoverride = require("method-override"); // this is used to override the default method of form submission, so that we can use PUT and DELETE methods in our forms.
const ejsMate = require("ejs-mate");
const wrapAsync = require("../utils/wrapAsync.js"); // this is used to wrap async functions to handle errors

// EJS routes - serve the EJS pages (these must come before API routes)

userrouter.get(  // this is the route to get all listings
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

userrouter.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res
        .status(404)
        .render("listings/404error", { error: "Listing not found" });
    }
    res.render("listings/show.ejs", { listing });
  })
);

// userrouter.set("view engine", "ejs");  // this line is used to set the view engine to ejs, so that we can use ejs templates in our views folder.

// userrouter.set("views", path.join(__dirname, "views")); // this line is used to set the views folder path, so that express can find the ejs templates in the views folder.

// userrouter.use(express.urlencoded({ extended: true })); // this line is used to parse the incoming request body, so that we can access the form data in req.body.

// userrouter.use(methodoverride("_method"));//

// userrouter.engine('ejs', ejsMate); // this line is used to use ejsMate as the template engine for ejs, which allows us to use layout files and partials in our ejs templates.

// userrouter.use(express.static(path.join(__dirname, "/public"))); // to use the static files from the public folder

// API routes - these should come before the catch-all route
userrouter.get(  // this is the API route to get all listings
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
