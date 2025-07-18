const joi = require('joi');
const review = require("./models/review");
// joi is a validation library for JavaScript, used to validate data structures.
// Here, we are using it to validate the data coming from the form. this is our server-side validation schema for the listing data.

//client-side validation is done using HTML5 attributes like required, pattern, etc. but server-side validation is done using joi or any other validation library.
// This schema will ensure that the data coming from the form is valid before saving it to the database.
// If the data is invalid, it will throw an error and the user will be redirected to the form with an error message.
// If the data is valid, it will be saved to the database.

module.exports.listingSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  image: joi.string().allow("", null), // Assuming image is a URL, you can adjust this if it's a file upload or something else that's not a URI.
  price: joi.number().required().min(0), // Assuming price should be a positive number
  location: joi.string().required(),
  country: joi.string().required()
});


module.exports.reviewSchema = joi.object({
  rating: joi.number().required(),
  comment: joi.string().required()
});
