const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("Review", reviewSchema);
