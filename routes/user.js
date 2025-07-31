const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router(); // mergeParams is used to merge the params of the parent route (listings/:id) with the child route (reviews)
const passport = require("passport"); // importing passport for authentication

let User = require("../models/user"); // importing the User model

router.get("/signup", (req, res) => {
  res.render("users/signup"); // rendering sign up page
});

router.post("/signup", wrapAsync(async (req, res) => {

  try {
    let { username, password, email } = req.body; // destructuring the request body to get username, password and email
  const newUser = new User({email , username }); // creating a new user object with username and email

  const registeredUser = await User.register(newUser, password); // registering the user with the password , here User.register is a method provided by passport-local-mongoose which hashes the password and saves the user to the database

  
  req.flash("success", "You have successfully signed up!"); // setting the success message
  console.log(registeredUser); // logging the registered user to the console
  res.redirect("/listings"); // redirecting to the listings page after successful sign up
  } catch (error) {
    // console.error("Error during signup:", error); // logging the error to the console
    req.flash("error", error.message,".  Please try again !!."); // setting the error message
    res.redirect("/signup"); // redirecting back to the signup page 
  }
}));

router.get("/login", (req, res) => {
  res.render("users/login"); // rendering login page
});



router.post("/login",passport.authenticate("local", { failureRedirect: "/login" , failureFlash: true }) ,async (req, res, next) => { // using passport to authenticate the user with local strategy , here passport.authenticate is a middleware that checks the username and password against the database , if the user is authenticated , it will call the next middleware(i.e. our async function will work) , if the user is not authenticated , it will redirect to the login page
req.flash("success", "Welcome back to TourStay !!"); // sending the response to the client after successful login
res.redirect("/listings");

});

module.exports = router; // exporting the router so that we can use it in app.js
