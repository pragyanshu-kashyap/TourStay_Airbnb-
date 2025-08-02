const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
const path = require("path");
const methodoverride = require("method-override"); // this is used to override the default method of form submission, so that we can use PUT and DELETE methods in our forms.
const ejsMate = require("ejs-mate");

const session = require("express-session"); // this is used to create a session for the user, so that we can store user data in the session

const flash = require("connect-flash"); // this is used to flash messages to the user, so that we can show success or error messages to the user


const passport = require("passport"); // this is used to authenticate the user, so that we can log in and log out the user
const LocalStrategy = require("passport-local").Strategy; // this is used to authenticate the user, so that we can log in and log out the user

const User = require("./models/user.js"); // this is used to import the User model, so that we can use it to authenticate the user

// const cookieParser = require("cookie-parser"); // this is used to parse the cookies in the request, so that we can access the cookies in req.cookies in any other route

// app.use(cookieParser()); // this line is used to parse the cookies in the request, so that we can access the cookies in req.cookies

app.set("view engine", "ejs"); // this line is used to set the view engine to ejs, so that we can use ejs templates in our views folder.

app.set("views", path.join(__dirname, "views")); // this line is used to set the views folder path, so that express can find the ejs templates in the views folder.

app.use(express.json()); //ye

app.use(express.urlencoded({ extended: true })); // this line is used to parse the incoming request body, so that we can access the form data in req.body.

app.use(methodoverride("_method")); //

app.engine("ejs", ejsMate); // this line is used to use ejsMate as the template engine for ejs, which allows us to use layout files and partials in our ejs templates.

app.use(express.static(path.join(__dirname, "/public"))); // to use the static files from the public folder

const sessionConfig = {
  secret: "mysupersecretcode", // secret key to sign the session ID cookie
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, // prevents client-side JavaScript from accessing the cookie
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // cookie will expire after 1 day
    maxAge: 1000 * 60 * 60 * 24 * 7, // cookie will expire after 1 day
  },
};
app.use(session(sessionConfig)); // this line is used to use express-session middleware, which allows us to create a session for the user

app.use(flash()); // this line is used to use connect-flash middleware, which allows us to flash messages to the user



app.use(passport.initialize()); // this line is used to initialize passport middleware, which allows us to use passport for authentication
app.use(passport.session()); // this line is used to use passport session middleware, which allows us to store user data in the session 

passport.use(new LocalStrategy(User.authenticate())); // this line is used to use the local strategy for authentication, which allows us to authenticate the user using username and password

passport.serializeUser(User.serializeUser()); // this line is used to serialize the user, which allows us to store the user ID in the session

passport.deserializeUser(User.deserializeUser()); // this line is used to deserialize the user, which allows us to retrieve the user data from the session using the user ID stored in the session



//koi bhi variable jisko hum direct ejs mai nhi use kr sakte hain, usko hum res.locals me store krte hain, taaki wo variable ejs templates me accessible ho sake. 
// As for example, we can use res.locals.currentUser to access the current user in ejs templates.
// This is useful for rendering user-specific data in the templates, such as showing the user's name in the navigation bar.

app.use((req, res, next) => { // this middleware is used to set the flash messages in res.locals, so that we can access them in our ejs templates

  res.locals.success = req.flash("success"); // this line is used to set the success message in res.locals, so that we can access it in our ejs templates
  res.locals.deletesuccess = req.flash("deletesuccess"); // this line is used to set the error message in res.locals, so that we can access it in our ejs templates

  res.locals.error = req.flash("error"); // this line is used to set the error message in res.locals, so that we can access it in our ejs templates

  res.locals.currentUser = req.user; // this line is used to set the current user in res.locals, so that we can access it in our ejs templates
  
  next(); // this line is used to call the next middleware in the stack, so that the request can continue to the next middleware or route handler
});

//local imports
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js"); // user routes for authentication and user management

main() //Async function call, returns a Promise
  .then(() => console.log("Connected to MongoDB database"))
  .catch((err) => console.log(err));

async function main() {
  // function ki definition likhi hui hai (hoisting ke wajah se mil jaata hai).
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

//our routess
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter); // this will mount the review router on the listings/:id/reviews route, so that we can access the reviews for a particular listing

app.use("/", userRouter); // user routes for authentication and user management

app.use("/", require("./routes/frontend.js")); // Serve React app for all other routes (SPA routing)



app.all("*", (req, res) => {
  // Catch-all route to handle 404 errors for unmatched routes
  res.status(404).render("listings/404error", { error: "Page Not Found" });
}); // Catch-all route to handle 404 errors for unmatched routes

// Global error handling middleware to handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  if (statusCode === 404) {
    // to render the 404 page if the error is a 404, and otherwise show a generic error message.
    return res.status(404).render("listings/404error", { error: message });
  }
  res.status(statusCode).render("listings/404error", { error: message }); // You can create a generic error.ejs if you want
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
