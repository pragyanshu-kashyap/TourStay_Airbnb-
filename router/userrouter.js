const express = require("express");
const app = express();
const userrouter = express.Router();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const path = require("path");
const methodoverride = require("method-override"); // this is used to override the default method of form submission, so that we can use PUT and DELETE methods in our forms.
const ejsMate = require("ejs-mate");

// userrouter.set("view engine", "ejs");  // this line is used to set the view engine to ejs, so that we can use ejs templates in our views folder.

// userrouter.set("views", path.join(__dirname, "views")); // this line is used to set the views folder path, so that express can find the ejs templates in the views folder.

// userrouter.use(express.urlencoded({ extended: true })); // this line is used to parse the incoming request body, so that we can access the form data in req.body.

// userrouter.use(methodoverride("_method"));//

// userrouter.engine('ejs', ejsMate); // this line is used to use ejsMate as the template engine for ejs, which allows us to use layout files and partials in our ejs templates.

// userrouter.use(express.static(path.join(__dirname, "/public"))); // to use the static files from the public folder

// Serve static files from the frontend build directory
userrouter.use(express.static(path.join(__dirname, "../frontend/dist")));

// API routes
userrouter.get("/api/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.json(allListings);
});

userrouter.get("/api/listings/:id", async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  res.json(listing);
});

// Serve React app only on root route
userrouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// main()
//   .then(() => console.log("Connected to MongoDB database"))
//   .catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
// }

userrouter.get("/", (req, res) => {
  res.sendfile(path.join(__dirname, "../frontend/src/app.jsx")); // this line is used to send the app.js file from the frontend/src folder, which is the entry point of the React application.
});

// indexroute to view all datas from db
userrouter.get("/listings", async (req, res) => {
  const allListings = await Listing.find({}); // here we are doing ".find()" method on Listing because it's our model name and all dbs based operations are done on models.
  res.render("listings/index.ejs", { allListings });
});

//show route for particular listing , when tapping on a particular listing all its details will be shown
userrouter.get("/listings/:id", async (req, res) => {
  const listing = await Listing.findById(req.params.id); // all details will be fetched from here on the basis of id

  res.render("listings/show.ejs", { listing });
});

module.exports = userrouter;
