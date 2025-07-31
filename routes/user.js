const express = require("express");
const user = express.Router({ mergeParams: true }); // mergeParams is used to merge the params of the parent route (listings/:id) with the child route (reviews)
