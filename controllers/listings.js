const Listing = require("../models/listing");
const mongoose = require("mongoose");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  //isLoggedIn middleware will check if the user is authenticated or not, if not then it will redirect to the login page with a flash message. if the user is authenticated then next middleware will be called which is the route handler for creating a new listing.
  // console.log("New listing page requested");

  res.render("listings/newlisting.ejs"); //render hmesha views folder ke andar se hi file ko render karega, so we don't have to provide the full path of the file, just the name of the file is enough.
};

// Helper to check for valid ObjectId
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports.showListing = async (req, res) => {
  let { id } = req.params;

  if (!isValidObjectId(id)) {
    // Check if the id is a valid ObjectId
    return res
      .status(404)
      .render("listings/404error", { error: "Invalid listing id" });
  }
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner"); // this will fetch the listing by id and populate the reviews field with the associated reviews.

  //populate method is used to populate any field which is a reference to another document (like here the reviews field and the owner field), so that we can display the reviews and owner on the show page of the listing , since they can't be fetched directly from the database like normal fields like title, description, image, price, location, country because they are references to other documents.
  if (!listing) {
    return res
      .status(404)
      .render("listings/404error", { error: "Listing not found" });
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path; // this will get the path of the uploaded file from the req.file object, which is created by multer middleware when the file is uploaded by "upload.single" middleware.

  let filename=req.file.filename; // this will get the filename of the uploaded file from the req.file object, which is created by multer middleware when the file is uploaded by "upload.single" middleware.

  const listing = new Listing(req.body.listing); // yha pe 'new' keyword k help se  Listing model ka ek or object banega jiske andar req.body.listing ka data hoga or usko "listing" variable me store krenge.

  listing.owner = req.user._id; // here we have not provided any field to the form to select the owner of the listing, so we are setting it to the current user who is creating the listing and who is logged in currently.
  // by default passport js will attach the user object to the request object with all details , as req.user when the user is authenticated, so we can access the user id from req.user._id.
  // req.user._id will give us the id of the user who is currently logged in

  listing.image = { url, filename }; // here we are setting the image field of the listing to the url and filename of the uploaded file, so that we can display the image on the show page of the listing.
  await listing.save();
  req.flash("success", "Listing created successfully !!"); // this will flash a success message to the user after creating the listing.
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash(
      "error",
      "Listing for editing you are searching for doesn't exist !!"
    );
    return res.redirect("/listings");
  }
  req.flash("success", "Listing fetched for editing");
  res.render("listings/editlisting.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params; // this will get the id from the url params and store it in the id variable

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // this will update the listing with the new data coming from the form.

  if (typeof req.file !== "undefined") {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await listing.save();

  req.flash("success", "Listing updated successfully");
  // this will flash a success message to the user after updating the listing.

  res.redirect(`/listings/${id}`); // this will redirect to the show page of the listing after saving the changes, so that we can see the updated listing.
};

module.exports.destroyListing = async (req, res) => {
  const deletedListing = await Listing.findByIdAndDelete(req.params.id); // the findByIdAndDelete method triggers pre and post middleware hooks defined in the schema, allowing you to execute custom logic before or after a document is deleted.

  //isiliye humne listing schema me post middleware define kiya hai jo ki listing ko delete karne ke baad usse associated reviews ko bhi delete kar dega Review Collection se.

  // this will delete the listing from the database and also trigger the post middleware defined in the Listing schema, which will delete the associated reviews from the Review collection.

  req.flash("deletesuccess", "Listing deleted successfully !!");
  // this will flash a success message to the user after deleting the listing.
  res.redirect("/listings");
};
