const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');

// routes

route.get('/', userController.homePage);

route.post('/add-new-message', userController.addNewMessage);

route.get('/update/message/:id', userController.editMessagePage);

route.post('/edit-message-form/:id', userController.editMessageForm);

// For postman delete method
route.delete('/delete/message/:id', userController.deleteMessage);

// for the browser  button
// delete message
route.get('/delete/message/:id', userController.deleteMessage);

// Add comments
route.post('/add/new-comments/:id', userController.addComments);

route.get('*', userController.notFoundPage);

module.exports = route;
