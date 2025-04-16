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


const Listing= mongoose.model('Listing', listingSchema);
module.exports = Listing;