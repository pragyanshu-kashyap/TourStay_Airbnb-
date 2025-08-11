const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
  },
  description: String,
  image: {
    url: String,
    filename: String,
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
  ],
  owner:{
    type: Schema.Types.ObjectId,
    ref: "User", // here we are refering to another collection named "users". made in user.js file
  
  }
});

listingSchema.post("findOneAndDelete", async function (listing) {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } }); //iss line ka matlab hai ki jab bhi koi listing delete hoti hai toh uske saath associated reviews bhi delete ho jaane chahiye , 

    //matlb Review collection se un reviews ko delete karna hai jinke ObjectId "listing.reviews" array me hain.

     // here we are creating a middleware which is going to execute after any document has been deleted from the database using findOneAndDelete method of mongoose. this middleware will have access to the listing object that was passed as an argument when the delete operation on the document was performed, so it can be used in other files where we need to perform some operations based on the properties and values of the document which is being deleted from the database using findOneAndDelete method of mongoose. this middleware will have access to the listing object that was passed as an argument when the delete operation on the document was performed, so it can be used in other files where we need to perform some operations based on the properties and values of the document which is being deleted from the database using findOneAndDelete method of mongoose. this middleware will have access to the listing object that was passed as an argument when the delete operation on the document was performed, so it can be used in other files where we need to perform some operations based on the properties and values of the document which is being deleted from the database using findOneAndDelete method of mongoose. this middleware by reference(by the help of Object Id) .
  }
});

const Listing = mongoose.model("Listing", listingSchema); // here we are creating a model named "Listing" from listingSchema which is defined above in this file., left side is the name of the model and right side is the schema which we created above.
//
// after that model is finally stored in a variable named "Listing" which we can use to perform various operations on the database like create, read, update and delete.In different files we can import this model containing variable
//
//  mongoose will automatically convert the model name to plural form and lowercase it, so it will create a collection named "listings" in the database. collection name is always plural and lowercase in mongoose, so we don't have to worry about that.
module.exports = Listing; // this will export the Listing model so that it can be used in other files.
