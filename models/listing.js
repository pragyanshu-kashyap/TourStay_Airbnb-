const mongoose = require("mongoose");
const reviews = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop", // default image, when the image is not uploaded , undefined or in short doesn't exist.
    set: (v) =>
      !v || v.trim() === ""
        ? "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
        : v, // by this way we can set default value for image or any other field based on any condition. this case is for when image is uploaded but is empty
  },
  price: {
    type: Number,
  },
  location: String,
  country: String,
  reviews:[ //one to few relation is being established here 
    {
      type:Schema.Types.ObjectId,
      ref: "Review" // here we are refering to another collection named "reviews". made in review.js file
    }
  ]
});

const Listing = mongoose.model("Listing", listingSchema); // here we are creating a model named "Listing" from listingSchema which is defined above in this file., left side is the name of the model and right side is the schema which we created above.
//
// after that model is finally stored in a variable named "Listing" which we can use to perform various operations on the database like create, read, update and delete.In different files we can import this model containing variable
//
//  mongoose will automatically convert the model name to plural form and lowercase it, so it will create a collection named "listings" in the database. collection name is always plural and lowercase in mongoose, so we don't have to worry about that.
module.exports = Listing; // this will export the Listing model so that it can be used in other files.
