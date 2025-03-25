const MessageModel = require('../models/messageModel');
const CommentModel = require('../models/commentModel');

const homePage = (req, res) => {
  MessageModel.find()
    .sort({ date: -1 })
    .populate('comments')
    .then((result) =>  res.render('homepage', { users: result }))
    .catch((err) => console.log(err));
};

const addNewMessage = (req, res) => {
  console.log('Received POST', req.body);
  const { name, message } = req.body;

  if (!req.body.message || req.body.message.length < 25) {
    return res.status(400).send('Comment must be at least 25 characters long.');
  }

  if (!message) {
    return res.status(400).send('Invalid message.');
  }
  let newMessage = new MessageModel({
    name: name,
    message: message,
    date: new Date(),
  });
  newMessage
    .save()
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
};

const deleteMessage = (req, res) => {
  console.log(req.params.id);
  MessageModel.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/'))
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
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
};

const addComments = (req, res) => {
  const id = req.params.id.trim();
  console.log(id);

  if (!req.body.body || req.body.body.length < 25) {
    return res.status(400).send('Comment must be at least 25 characters long.');
  }

  if (!id) {
    return res.status(400).send('Invalid blog ID.');
  }

  const newComment = new CommentModel({
    body: req.body.body,
    message: id,
  });

  newComment
    .save()
    .then((savedComment) => {
      // Now find the message and push the comment's ID
      return MessageModel.findById(id).then((message) => {
        if (!message) {
          return res.status(404).send('Message not found');
        }
        message.comments.push(savedComment._id);

        return message.save().then(() => {
          return res.redirect('/');
        });
      });
    })
    .catch((err) => console.log(err));
};

const notFoundPage = (req, res) => {
  res.status(404).render('404', { title: '404' });
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
