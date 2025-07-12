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

//create route for new listing
adminrouter.get("/listings/new", (req, res, next) => {
  console.log("New listing page requested");
  res.render("listings/newlisting.ejs"); //render hmesha views folder ke andar se hi file ko render karega, so we don't have to provide the full path of the file, just the name of the file is enough.
});

//post route to save changes on db after creating new listings
adminrouter.post(
  "/listings",
  wrapAsync(async (req, res, next) => {
    let result = listingSchema.validate(req.body); // validate the data coming from the form using the schema we created , ye ek taeeke se data ko validate karega or agar data valid hoga to result me ek object milega jisme error property undefined hogi or agar data invalid hoga to result me error property me error message milega.

    console.log(result);

    if (result.error) {
      throw new ExpressError(400, result.error);
    }

    const listing = new Listing(req.body.listing); // yha pe 'new' keyword k help se  Listing model ka ek or object banega jiske andar req.body.listing ka data hoga or usko "listing" variable me store krenge.

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
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.image = req.body.listing.image;
    listing.price = req.body.listing.price;
    listing.location = req.body.listing.location;
    listing.country = req.body.listing.country;
    await listing.save();
    res.redirect("/listings");
  })
);

//show route for particular listing , when a user clicks on a particular listing then he/she will be redirected to this route and here we are rendering the show ejs file which has all details of that particular listing in its context object.adminroutering on a particular listing all its details will be shown
adminrouter.get(
  "/listings/:id",
  wrapAsync(async (req, res, next) => {
    const listing = await Listing.findById(req.params.id); // all details will be fetched from here on the basis of id
    res.render("listings/show.ejs", { listing });
  })
);

module.exports = adminrouter;
