const express = require("express");
const app = express();
const adminrouter = express.Router();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const path = require("path");
const methodoverride = require("method-override"); // this is used to override the default method of form submission, so that we can use PUT and DELETE methods in our forms.
 

//create route for new listing
adminrouter.get("/listings/new", (req, res , next) => {
    console.log("New listing page requested");
    res.render("listings/newlisting.ejs");
});

//post route to save changes on db after creating new listings
adminrouter.post("/listings", async (req, res , next) => {
  const listing = new Listing(req.body); // yha pe 'new' keyword k help se  Listing model ka ek or object banega jiske andar req.body ka data hoga or usko "listing" variable me store krenge.
  await listing.save();
  res.redirect("/listings");
});

//edit route for A  particular listing
adminrouter.get("/listings/:id/edit", async (req, res , next) => {
  const listing = await Listing.findById(req.params.id);
  res.render("listings/editlisting.ejs", { listing });
});


//delete route for A  particular listing
adminrouter.delete("/listings/:id", async (req, res ) => {
  const deletedListing = await Listing.findByIdAndDelete(req.params.id);
  console.log(deletedListing);
  res.redirect("/listings");
});


//post route to save changes on db after editing listings
adminrouter.post("/listings/:id", async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  listing.title = req.body.title;
  listing.description = req.body.description;
  listing.image = req.body.image;
  listing.price = req.body.price;
  listing.location = req.body.location;
  listing.country = req.body.country;
  await listing.save();
  res.redirect("/listings");
}); 

//show route for particular listing , when tadminroutering on a particular listing all its details will be shown
adminrouter.get("/listings/:id", async (req, res) => {
  const listing = await Listing.findById(req.params.id); // all details will be fetched from here on the basis of id

  res.render("listings/show.ejs", { listing });
});


module.exports= adminrouter;