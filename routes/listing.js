const express = require("express");

const listing = express.Router();

// const Listing = require("../models/listing.js");
const path = require("path");
const methodoverride = require("method-override"); // this is used to override the default method of form submission, so that we can use PUT and DELETE methods in our forms.
const wrapAsync = require("../utils/wrapAsync.js"); // this is used to wrap async functions to handle errors

const { isLoggedIn} = require("../middleware.js"); // importing the middleware functions we created to check if the user is logged in
const { isOwner } = require("../middleware.js"); // importing the middleware function to check if the user is the owner of the listing
const { validateListing } = require("../middleware.js"); // importing the middleware function to validate the listing data coming from the form

const multer  = require('multer'); // this is used to handle file uploads in forms
// multer will handle the file uploads and store them in the specified directory, we will use it to handle the image uploads in the new listing form.

const {storage} = require('../cloudConfig.js'); // importing the cloudinary storage configuration we created to handle file uploads to Cloudinary

// const upload = multer({ dest : 'uploads/' }); // this will create a new instance of multer with the specified destination for file uploads.

const upload = multer({ storage }); // this will create a new instance of multer with the cloudinary storage configuration, and it will handle the file uploads in the new listing form and will upload it to the cloudinary storage.

const listingController = require("../controllers/listings.js"); // importing the controller functions for listings

listing.route("/")
  .get(wrapAsync(listingController.index)) // this is the route to get all listings and render the index view
  .post(
    isLoggedIn, // this will check if the user is logged in before allowing them to do any action , whereever we want to check if the user is logged in we will use this middleware function.

    upload.single('listing[image]'),// this middleware will handle the file upload when the user submits the new listing form, and it will save the file in the cloudinary storage.
    
    validateListing, // this will validate the data coming from the form before saving it to the database, if data is invalid then it will throw an error and the next middleware will not be executed.
    
    wrapAsync(listingController.createListing)
  ); // this is the route to create a new listing and save it to the database, it will check if the user is logged in and if the data is valid before saving it to the database.
 


//create route for new listing
listing.get("/new",isLoggedIn, listingController.renderNewForm); // this will render the new listing form when the user clicks on the "Create New Listing" button, and it will check if the user is logged in before allowing them to create a new listing.

//router to show a particular listing
listing.get(
  "/:id",
  wrapAsync(listingController.showListing) // this will render the show page of a particular listing when the user clicks on a particular listing, and it will check if the id is valid before fetching the listing from the database.
);

//edit route for A  particular listing
listing.get(
  "/:id/edit",isLoggedIn,
  wrapAsync(listingController.renderEditForm) // this will render the edit form for a particular listing when the user clicks on the "Edit" button, and it will check if the user is logged in before allowing them to edit the listing.
);



//post route to save changes on db after editing listings
listing.post(
  "/:id",isLoggedIn,isOwner,
  //isOwner middleware will check if the current user is the owner of the listing, if not then it will throw an error and redirect to the show page of the listing with a flash message.
  validateListing,
  wrapAsync(listingController.updateListing) // this will update the listing in the database after editing it, and it will check if the data is valid before updating it.
);

//delete route for A  particular listing
listing.delete(
  "/:id",isLoggedIn, isOwner,
  wrapAsync(listingController.destroyListing)
);



//show route for particular listing , when a user clicks on a particular listing then he/she will be redirected to this route and here we are rendering the show ejs file which has all details of that particular listing in its context object.listinging on a particular listing all its details will be shown

// listing.get(
//   "/:id",
//   wrapAsync(async (req, res, next) => {
//     const listing = await Listing.findById(req.params.id).populate("reviews"); // all details will be fetched from here on the basis of id
//     res.render("listings/show.ejs", { listing });
//   })
// );

module.exports = listing;
