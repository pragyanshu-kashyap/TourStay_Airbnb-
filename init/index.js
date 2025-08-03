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
   initData.data = initData.data.map((obj) => ({...obj,owner: "688bb924741b0bc1bee15530"}));//this line means that we are setting the owner of each listing to a specific user ID , we could also do it manually by going manually to the database(data.js file) and setting the owner field for each listing. But this is a more efficient way to do it programmatically.

  await Listing.insertMany(initData.data);
  console.log("Data was initialized successfully!");
};

initDB();
