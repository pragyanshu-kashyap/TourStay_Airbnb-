const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router(); // mergeParams is used to merge the params of the parent route (listings/:id) with the child route (reviews)

const passport = require("passport"); // importing passport for authentication
const { saveRedirectUrl } = require("../middleware"); // importing the saveRedirectUrl middleware to save the original URL before redirecting to the login page

const userController = require("../controllers/users");

router.get("/signup",userController.renderSignupForm);

router.post(
  "/signup",
  wrapAsync(userController.signup)
);

router.get("/login", userController.renderLoginForm); // rendering the login page);

//passport.authenticate() is middleware which will authenticate the request. By default, when authentication succeeds, the req.user property is set to the authenticated user, a login session is established, and the next function in the stack is called.
router.post(
  "/login",
  saveRedirectUrl, // this middleware is used to save the original URL in the locals object before redirecting to the login page

  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login // this is the callback function that will be called after successful authentication
);

router.get("/logout",userController.logout); // logging out the user

module.exports = router; // exporting the router so that we can use it in app.js
