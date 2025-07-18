const express = require("express");
const app = express();
const adminrouter = express.Router();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const path = require("path");
const methodoverride = require("method-override"); // this is used to override the default method of form submission, so that we can use PUT and DELETE methods in our forms.
const wrapAsync = require("../utils/wrapAsync.js"); // this is used to wrap async functions to handle errors
const ExpressError = require("../utils/ExpressError.js"); // this is used to handle errors in our application, we will create our own error class to handle errors.
const { listingSchema } = require("../schema.js"); // this is the schema we created to validate the data coming from the form


const validateListing = (req, res, next) => {
  // Reconstruct the listing object from flat fields
  const listing = {
    title: req.body.listing.title,
    description: req.body.listing.description,
    image: req.body.listing.image,
    price: req.body.listing.price,
    location: req.body.listing.location,
    country: req.body.listing.country
  };
  // console.log(listing);
  const { error } = listingSchema.validate(listing);
  if (error) {
    // console.log(error);
    let errorMsg=error.details.map(el => el.message).join(',');
    throw new ExpressError(400, errorMsg );
  } else {
    // Optionally attach validated listing to req for use in route handler
    // req.validatedListing = listing;
    next();
  }
};

//create route for new listing
adminrouter.get("/listings/new", (req, res, next) => {
  console.log("New listing page requested");
  res.render("listings/newlisting.ejs"); //render hmesha views folder ke andar se hi file ko render karega, so we don't have to provide the full path of the file, just the name of the file is enough.
});

//post route to save changes on db after creating new listings
adminrouter.post(
  "/listings",
  validateListing, // this will validate the data coming from the form before saving it to the database, if data is invalid then it will throw an error and the next middleware will not be executed.
  wrapAsync(async (req, res, next) => {
    const listing = new Listing(req.body.listing); // yha pe 'new' keyword k help se  Listing model ka ek or object banega jiske andar req.body.listing ka data hoga or usko "listing" variable me store krenge. 

    //ek point note krne layak hai ki, form mai "name" k andar listing object k andar data store hoga qki yha req.body.listing will give us the data in the form of an object. 
    // so we have to pass req.body.listing to the Listing model to create a new listing.
    //eg:- name="listing[title]" will give us req.body.listing.title
    //eg:- name="listing[description]" will give us req.body.listing.description

    await listing.save();
    res.redirect("/listings");
  })
);

//edit route for A  particular listing
adminrouter.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/editlisting.ejs", { listing });
  })
);

//delete route for A  particular listing
adminrouter.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    console.log(deletedListing);
    res.redirect("/listings");
  })
);

//post route to save changes on db after editing listings
adminrouter.post(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.image = req.body.listing.image;
    listing.price = req.body.listing.price;
    listing.location = req.body.listing.location;
    listing.country = req.body.listing.country;
    await listing.save();
    let { id } = req.params; // this will get the id from the url params
    res.redirect(`/listings/${id}`); // this will redirect to the show page of the listing after saving the changes, so that we can see the updated listing.
  })
);

//show route for particular listing , when a user clicks on a particular listing then he/she will be redirected to this route and here we are rendering the show ejs file which has all details of that particular listing in its context object.adminroutering on a particular listing all its details will be shown

adminrouter.get(
  "/listings/:id",
  wrapAsync(async (req, res, next) => {
    const listing = await Listing.findById(req.params.id).populate("reviews"); // all details will be fetched from here on the basis of id
    res.render("listings/show.ejs", { listing });
  })
);

module.exports = adminrouter;
