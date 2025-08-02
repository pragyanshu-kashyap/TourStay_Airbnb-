const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router(); // mergeParams is used to merge the params of the parent route (listings/:id) with the child route (reviews)
const passport = require("passport"); // importing passport for authentication

let User = require("../models/user"); // importing the User model
const { saveRedirectUrl } = require("../middleware");

router.get("/signup", (req, res) => {
  res.render("users/signup"); // rendering sign up page
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, password, email } = req.body; // destructuring the request body to get username, password and email
      const newUser = new User({ email, username }); // creating a new user object with username and email

      const registeredUser = await User.register(newUser, password); // registering the user with the password , here User.register is a method provided by passport-local-mongoose which hashes the password and saves the user to the database

      req.login(registeredUser, (err) => {
        // req.login is a method provided by passport to log in the user after registration, it sets the user in the session , it takes the registered user and a callback function as arguments. If there is an error during login, it will call the callback function with the error as the first argument.
        if (err) {
          console.error("Error during login after signup:", err); // logging the error to the console
          req.flash(
            "deletesuccess",
            "Something went wrong during login. Please try again."
          ); // setting the error message
          return res.redirect("/login"); // redirecting back to the signup page
        }
        // If login is successful, proceed to the next step
        console.log(
          "User logged in successfully after signup:",
          registeredUser
        ); // logging the registered user to the console
        req.flash("success", "You have successfully signed up!"); // setting the success message

        res.redirect("/listings"); // redirecting to the listings page after successful sign up
      });
    } catch (error) {
      // console.error("Error during signup:", error); // logging the error to the console
      req.flash("error", error.message, ".  Please try again !!."); // setting the error message
      res.redirect("/signup"); // redirecting back to the signup page
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login"); // rendering login page
});

//passport.authenticate() is middleware which will authenticate the request. By default, when authentication succeeds, the req.user property is set to the authenticated user, a login session is established, and the next function in the stack is called.
router.post(
  "/login",
  saveRedirectUrl, // this middleware is used to save the original URL in the locals object before redirecting to the login page

  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res, next) => {
    // using passport to authenticate the user with local strategy , here passport.authenticate is a middleware that checks the username and password against the database , if the user is authenticated , it will call the next middleware(i.e. our async function will work) , if the user is not authenticated , it will redirect to the login page
    req.flash("success", "Welcome back to TourStay !!"); // sending the response to the client after successful login

    //res.redirect(req.session.redirectUrl ); // redirecting to the original url , but ye line work nhi krega qki login k baad passsport by default req.session ko reset kr dega or req.session.redirectUrl ko undefined kr dega, so we will have to set the redirectUrl in the req.locals object in app.js file, so that we can access it , since passport will not reset the res.locals object.

    res.redirect(res.locals.redirectTo); // redirecting to the original url where the user was trying to go before logging in.
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    // req.logout is a method provided by passport to log out the user , it removes the user from the session and also removes the user from the req.user object , in short it clears the session data related to the user.

    if (err) {
      console.error("Error during logout:", err); // logging the error to the console
      req.flash(
        "error",
        "Something went wrong while logging out. Please try again."
      ); // setting the error message
      return next(err); // redirecting to the listings page
    }
    req.flash("success", "Successfully logged out !!!."); // setting the success message
    res.redirect("/listings"); // redirecting to the listings page
  });
});

module.exports = router; // exporting the router so that we can use it in app.js
