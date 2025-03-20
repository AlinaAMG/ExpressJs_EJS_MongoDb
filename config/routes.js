const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController")

// routes

route.get("/", userController.homePage);

route.post("/add-new-message", userController.addNewMessage);
// For postman delete method
route.delete("/delete/message/:id", userController.deleteMessage)
// for the browser  button
route.get("/delete/message/:id", userController.deleteMessage);

route.get("/update/message/:id", userController.editMessagePage);

route.post("/edit-message-form/:id", userController.editMessageForm);

route.get("*", userController.notFoundPage);

module.exports = route;