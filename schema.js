const Joi = require("joi");
// Joi is a validation library for JavaScript, used to validate data structures.
// Here, we are using it to validate the data coming from the form. this is our server-side validation schema for the listing data.

//client-side validation is done using HTML5 attributes like required, pattern, etc. but server-side validation is done using Joi or any other validation library.
// This schema will ensure that the data coming from the form is valid before saving it to the database.
// If the data is invalid, it will throw an error and the user will be redirected to the form with an error message.
// If the data is valid, it will be saved to the database.

module.exports.listingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  price: Joi.number().required().min(0), // Assuming price should be a positive number
  image: Joi.string().allow("", null), // Assuming image is a URL, you can adjust this if it's a file upload or something else that's not a URI.
});
