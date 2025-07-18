const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
const path = require("path");
const methodoverride = require("method-override"); // this is used to override the default method of form submission, so that we can use PUT and DELETE methods in our forms.
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs"); // this line is used to set the view engine to ejs, so that we can use ejs templates in our views folder.

app.set("views", path.join(__dirname, "views")); // this line is used to set the views folder path, so that express can find the ejs templates in the views folder.

app.use(express.json()); //ye

app.use(express.urlencoded({ extended: true })); // this line is used to parse the incoming request body, so that we can access the form data in req.body.


app.use(methodoverride("_method")); //

app.engine("ejs", ejsMate); // this line is used to use ejsMate as the template engine for ejs, which allows us to use layout files and partials in our ejs templates.

app.use(express.static(path.join(__dirname, "/public"))); // to use the static files from the public folder

// Note: Static file serving for React app is handled in userrouter.js

//local imports
const userrouter = require("./router/userrouter.js");
const adminrouter = require("./router/adminrouter.js");

main() //Async function call, returns a Promise 
  .then(() => console.log("Connected to MongoDB database"))
  .catch((err) => console.log(err));

async function main() { // function ki definition likhi hui hai (hoisting ke wajah se mil jaata hai).
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

//our routers
app.use(adminrouter);
app.use(userrouter);

// Note: The catch-all route is now handled in userrouter.js for SPA routing
// API routes are handled before the catch-all route

// Global error handling middleware to handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  if (statusCode === 404) {
    // to render the 404 page if the error is a 404, and otherwise show a generic error message.
    return res.status(404).render("listings/404error", { error: message });
  }
  res
    .status(statusCode)
    .render("listings/404error", { error: message }); // You can create a generic error.ejs if you want
});

// // agar koi route match nahi hota hai to yha iss middleware pe hit hoga or 404 error page show hoga
// app.use("*", (req, res, next) => {
//   res
//     .status(404)
//     .render("listings/404error", { error: "Page Not Found" }); //the render() method is used to render the ejs template for 404 error page.
// });

// **Problem:**
// The `.render()` method expects the view name relative to your views directory, **without the file extension** and without a leading AirBnb project.

// **Solution:**
// If your `404error.ejs` file is inside listings, you should use:

// res.status(404).render("listings/404error", { error: "Page Not Found" });
// ```

// **Summary:**
// - Remove AirBnb project and `.ejs` from the path.
// - Use the path relative to your views folder.

// **Corrected code:**
// ````javascript
// app.use((req, res, next) => {
//   res
//     .status(404)
//     .render("listings/404error", { error: "Page Not Found" });
// });
// ````

// Make sure the file `404error.ejs` exists in listings.
// });

// Catch-all route to serve the React app for any unmatched routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
// });

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// // indexroute to view all datas from db
// app.get("/listings", async (req, res) => {

//   const allListings = await Listing.find({}); // here we are doing ".find()" method on Listing because it's our model name and all dbs based operations are done on models.
//   res.render("listings/index.ejs", { allListings });
// });

//create route for new listing
// app.get("/listings/new", (req, res) => {
//   res.render("listings/newlisting.ejs");
// });

// //post route to save changes on db after creating new listings
// app.post("/listings", async (req, res) => {
//   const listing = new Listing(req.body); // yha pe 'new' keyword k help se  Listing model ka ek or object banega jiske andar req.body ka data hoga or usko "listing" variable me store krenge.
//   await listing.save();
//   res.redirect("/listings");
// });

// //edit route for A  particular listing
// app.get("/listings/:id/edit", async (req, res) => {
//   const listing = await Listing.findById(req.params.id);
//   res.render("listings/editlisting.ejs", { listing });
// });

// //delete route for A  particular listing
// app.delete("/listings/:id", async (req, res) => {
//   const deletedListing = await Listing.findByIdAndDelete(req.params.id);
//   console.log(deletedListing);
//   res.redirect("/listings");
// });

// //post route to save changes on db after editing listings
// app.post("/listings/:id", async (req, res) => {
//   const listing = await Listing.findById(req.params.id);
//   listing.title = req.body.title;
//   listing.description = req.body.description;
//   listing.image = req.body.image;
//   listing.price = req.body.price;
//   listing.location = req.body.location;
//   listing.country = req.body.country;
//   await listing.save();
//   res.redirect("/listings");
// });

// //show route for particular listing , when tapping on a particular listing all its details will be shown
// app.get("/listings/:id", async (req, res) => {
//   const listing = await Listing.findById(req.params.id); // all details will be fetched from here on the basis of id

//   res.render("listings/show.ejs", { listing });
// });

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
