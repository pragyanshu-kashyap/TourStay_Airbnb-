//here in this file we will connect to the database and initialize it with data
//we will use the database to store and retrieve data

const mongoose = require("mongoose");
const initData = require("./data.js");

const Listing = require("../models/listing.js");

main()
  .then(() => console.log("Connected to MongoDB database"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}


//here we will initialize the database with data 
const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("Data was initialized successfully!");
};

initDB();
