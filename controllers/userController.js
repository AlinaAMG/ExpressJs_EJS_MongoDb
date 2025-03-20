
const messageModel = require('../models/messageModel');

const homePage = (req, res) => {
  messageModel
    .find()
    .then((result) => {
      // if the request comes from Postman,return JSON
      if (req.query.format==="json") {
        res.json(result);
      } else {
        res.render('homepage', { users: result });
      }
    })
    .catch((err) => console.log(err));
};

const addNewMessage = (req, res) => {
  console.log('Received POST');
  const { name, message } = req.body;
  let newMessage = new messageModel({
    name: name,
    message: message,
    date: new Date(),
  });
  newMessage
    .save()
    .then((savedMessage) => {
      // postman request
      if (req.query.format === "json") {
        res.status(201).json({
          success: true,
          message: "Message added",
          data: savedMessage
        });
      } else {
      
        res.redirect('/')
      }
    })
    .catch((err) => console.log(err));
};

const deleteMessage = (req, res) => {
  console.log(req.params.id);
  messageModel
    .findByIdAndDelete(req.params.id)
    .then((deletedMessage) => {
      // for postman request
      if (req.query.format === "json") {
        res.status(200).json({
          success: true,
          message: "Message deleted",
          data: deletedMessage
        });
      } else {
        res.redirect('/');
      }
    })
    .catch((err) => console.log(err));
};

const editMessagePage = (req, res) => {
  messageModel
    .findById(req.params.id)
    .then((messageInfo) => {
      res.render('edit-message', { message: messageInfo });
    })
    .catch((err) => console.log(err));
};

const editMessageForm = (req, res) => {
  messageModel
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedMessage) => {
      if (req.query.format === "json"){
        res.status(200).json({
          succes: true,
          message: "Message updated",
          data: updatedMessage
        });
      } else {
        res.redirect('/');
      }
      
    })
    .catch((err) => console.log(err));
};

const notFoundPage = (req, res) => {
  res.status(404).send('404 Page not found');
};

module.exports = {
  homePage,
  addNewMessage,
  deleteMessage,
  editMessagePage,
  editMessageForm,
  notFoundPage,
};
