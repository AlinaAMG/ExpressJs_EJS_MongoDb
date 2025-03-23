const MessageModel = require('../models/messageModel');
const CommentModel = require('../models/commentModel');

const homePage = (req, res) => {
  MessageModel.find()
    .sort({ date: -1 })
    .populate('comments')

    .then((result) => {
      // if the request comes from Postman,return JSON
      if (req.query.format === 'json') {
        res.json(result);
      } else {
        res.render('homepage', { users: result });
      }
    })
    .catch((err) => console.log(err));
};

const addNewMessage = (req, res) => {
  console.log('Received POST', req.body);
  const { name, message } = req.body;
  let newMessage = new MessageModel({
    name: name,
    message: message,
    date: new Date(),
  });
  newMessage
    .save()
    .then((savedMessage) => {
      // postman request
      if (req.query.format === 'json') {
        res.status(201).json({
          success: true,
          message: 'Message added',
          data: savedMessage,
        });
      } else {
        res.redirect('/');
      }
    })
    .catch((err) => console.log(err));
};

const deleteMessage = (req, res) => {
  console.log(req.params.id);
  MessageModel.findByIdAndDelete(req.params.id)
    .then((deletedMessage) => {
      // for postman request
      if (req.query.format === 'json') {
        res.status(200).json({
          success: true,
          message: 'Message deleted',
          data: deletedMessage,
        });
      } else {
        res.redirect('/');
      }
    })
    .catch((err) => console.log(err));
};

const editMessagePage = (req, res) => {
  MessageModel.findById(req.params.id)
    .then((messageInfo) => {
      res.render('edit-message', { message: messageInfo });
    })
    .catch((err) => console.log(err));
};

const editMessageForm = (req, res) => {
  MessageModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedMessage) => {
      if (req.query.format === 'json') {
        res.status(200).json({
          succes: true,
          message: 'Message updated',
          data: updatedMessage,
        });
      } else {
        res.redirect('/');
      }
    })
    .catch((err) => console.log(err));
};



const addComments = (req, res) => {
  const id = req.params.id.trim();
  console.log(id);
  if (req.body.body && id) {
    const newComment = new CommentModel({
      body: req.body.body,
      message: id, 
    });

    newComment
      .save()
      .then(savedComment => {
        // Now find the message and push the comment's ID
        return MessageModel.findById(id)
      .then(message => {
          if (!message) {
            res.status(404).send('Message not found');
            return;
          }

          message.comments.push(savedComment._id);

          return message.save()
       .then(() => {
            res.redirect('/');
          });
        });
      })
        .catch(err =>console.log(err));
  } else {
    res.status(400).send('Comment body is missing or invalid ID');
  }
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
  addComments,
  notFoundPage,
};
