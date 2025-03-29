const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const userAuth = require("../auth/auth");



// routes

route.get('/',userAuth.isLoggedIn, userController.homePage);

route.post('/add-new-message', userController.addNewMessage);

route.get('/update/message/:id', userController.editMessagePage);

route.post('/edit-message-form/:id', userController.editMessageForm);

// For postman delete method
route.get('/delete/message/:id', userController.deleteMessage);

// for the browser  button
// delete message

// Add comments
route.post('/add/new-comments/:id', userController.addComments);

// Delete comments
route.get("/delete/comment/:commentId", userController.deleteComment);


route.get('*', userController.notFoundPage);

module.exports = route;
