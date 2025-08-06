const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
      
    comment: {
        type: String,
      },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: { 
        type: Date ,
        default: Date.now() // default value is the current date and time
    },
    author:{
    type: Schema.Types.ObjectId,
    ref: "User", // here we are refering to another collection named "users". made in user.js file
    },
});

module.exports = mongoose.model("Review", reviewSchema);
