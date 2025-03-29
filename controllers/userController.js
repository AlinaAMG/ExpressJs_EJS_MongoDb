const MessageModel = require('../models/messageModel');
const CommentModel = require('../models/commentModel');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const homePage = async (req, res) => {
  const token = req.cookies.userToken;

  if (!token) {
    return res.redirect('/user/signup-login');
  }

  jwt.verify(token, 'User is jwt now', async (err, decoded) => {
    if (err) {
      console.log('Invalid token');
      return res.redirect('/user/signup-login');
    }

    // Find the user using the decoded email
    UserModel.findOne({ email: decoded.email })
      .then((user) => {
        return MessageModel.find()
          .sort({ date: -1 })
          .populate('comments')
          .then((messages) => {
            res.render('homepage', {
              users: messages,
              message: '',
              userEmail: decoded.email,
              userName: user ? user.firstName : 'Guest',//display the name of the user
            });
          });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error retrieving messages');
      });
  });
};

const addNewMessage = (req, res) => {
  console.log('Received POST', req.body);
  const { name, message } = req.body;

  if (!name || !message) {
    return res.render('homepage', {
      message: 'All fields are required',
      users: [],
      userEmail: '',
      userName: '',
    });
  }

  if (message.length < 25) {
    return res.render('homepage', {
      message: 'Message have to be at least 25 characters long',
      users: [],
      userName: '',
      userEmail: '',
    });
  }

  // if (!message) {
  //   return res.status(400).send('Invalid message.');
  // }
  let newMessage = new MessageModel({
    name: name,
    message: message,
    date: new Date(),
  });
  newMessage
    .save()
    .then(() => res.redirect('/'))
    .catch((err) => {
      if (req.body.name === '' || req.body.message === '') {
        res.render('homepage', {
          message: 'An error ocurred,please try again.',
          users: [],
          userName: '',
          userEmail: '',
        });
      }
    });
};

const deleteMessage = (req, res) => {
  const id = req.params.id.trim(); // Get the ID from the URL parameter

  console.log('Deleting message with ID:', id);

  if (!id) {
    return res.status(400).send('Invalid message ID.');
  }

  //  Find the message by its ID
  MessageModel.findByIdAndDelete(id)
    .then((deletedMessage) => {
      if (!deletedMessage) {
        return res.status(404).send('Message not found.');
      }

      res.redirect('/');
    })
    .catch((err) => {
      console.error('Error deleting message:', err);
      res.status(500).send('Server error while deleting message.');
    });
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
  console.log('Message ID', id);

  // if (!req.body.body || req.body.body.length < 25) {
  //   return res.status(400).send('Comment must be at least 25 characters long.');
  // }

  if (!id) {
    return res.status(400).send('Invalid comment ID.');
  }

  const newComment = new CommentModel({
    body: req.body.body,
    // ...req.body,
    message: id,
  });

  newComment
    .save()
    .then((comment) => {
      // Now find the message and push the comment's ID
      console.log(comment._id);
      return MessageModel.findById(id).then((message) => {
        if (!message) {
          return res.status(404).send('Message not found');
        }
        message.comments.push(comment._id);

        return message.save().then(() => {
          return res.redirect('/');
        });
      });
    })
    .catch((err) => console.log(err));
};

const deleteComment = (req, res) => {
  const { commentId } = req.params;
  console.log(commentId);

  // Find the comment in the database
  CommentModel.findById(commentId)
    .then((comment) => {
      if (!comment) {
        return res.status(404).send('Comment not found');
      }

      return MessageModel.updateOne(
        { comments: commentId },
        { $pull: { comments: commentId } } // Remove the commentId from the message's comments array
      );
    })
    .then(() => {
      // Delete the comment
      return CommentModel.findByIdAndDelete(commentId);
    })
    .then((deletedComment) => {
      if (!deletedComment) {
        return res.status(404).send('Comment not found');
      }
      console.log('Comment deleted:', deletedComment);
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Server error:', err);
    });
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
  deleteComment,
  notFoundPage,
};
