const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
        title:{
            type:String,
            required:true,
        },
        description: String,
        image: {

            type:String,
            default:"https://unsplash.com/photos/charming-white-buildings-with-colorful-doors-and-windows-WHqMp9uJt6g", // default image, when the image is not uploaded , undefined or in short doesn't exist.
            set: (v) => v===" " ? "https://unsplash.com/photos/charming-white-buildings-with-colorful-doors-and-windows-WHqMp9uJt6g" : v, // by this way we can set default value for image or any other field based on any condition. this case is for when image is uploaded but is empty
        },
        price:{
            type:Number,
            default:2000,
        },
        location: String,
        country: String,
});


const Listing= mongoose.model('Listing', listingSchema); // here we are creating a model named "Listing" from listingSchema which is defined above in this file., left side is the name of the model and right side is the schema which we created above. mongoose will automatically convert the model name to plural form and lowercase it, so it will create a collection named "listings" in the database. collection name is always plural and lowercase in mongoose, so we don't have to worry about that.
module.exports = Listing; // this will export the Listing model so that it can be used in other files.