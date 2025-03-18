const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController")

// routes

route.get("/", userController.homePage);
route.get("*", userController.notFoundPage);

module.exports = route;