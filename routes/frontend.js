const express = require("express");
const frontend = express.Router();

const path = require("path");

const wrapAsync = require("../utils/wrapAsync.js"); // this is used to wrap async functions to handle errors

// Serve React app from the built dist directory
frontend.use(express.static(path.join(__dirname, "../frontend/dist")));


module.exports = frontend;