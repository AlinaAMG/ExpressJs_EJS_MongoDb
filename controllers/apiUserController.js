const MessageModel = require('../models/messageModel');
const CommentModel = require('../models/commentModel');

// get all messages(read)

const getMessages = (req, res) => {
  console.log('Fetching messages...');

  MessageModel.find()
    .populate('comments')
    .then((messages) => {
      console.log('Messages found:', messages);
      if (!messages || messages.length === 0) {
        return res.status(404).json({ message: 'No messages found' });
      }
      res.status(200).json(messages);
    })
    .catch((err) => {
      console.log('Error fetching messages:', err);
      res.status(400).json({ message: 'Error fetching the data' });
    });
};

// Add new message(create)

const addMessage = (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ message: 'All field are required' });
  }
  const newMessage = new MessageModel({ name, message });
  newMessage
    .save()
    .then((savedMessage) => res.status(201).json(savedMessage))
    .catch((err) =>
      res.status(500).json({ message: 'Error by adding a new message' })
    );
};

// Edit message page(update)
const editMessagePage = (req, res) => {
  const id = req.params.id;
  MessageModel.findById(id)
    .then((message) => {
      if (!message) {
        return res.status(404).json({ message: 'Message not found!' });
      }
      res.status(202).json(message);
    })
    .catch((err) =>
      res.status(404).json({ message: 'Error by updating the page' })
    );
};

// Edit message form(update)
const editMessageForm = (req, res) => {
  const id = req.params.id;
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  MessageModel.findByIdAndUpdate(id, { name, message }, { new: true })
    .then((updatedMessage) => {
      if (!updatedMessage) {
        return res.status(404).json({ message: 'Message not found' });
      }
      res.status(202).json(updatedMessage);
    })
    .catch((err) =>
      res.status(404).json({ message: 'Error by updating the form' })
    );
};

// delete message(delete)

const deleteMessage = (req, res) => {
  const id = req.params.id;
  MessageModel.findByIdAndDelete(id)
    .then((deletedMessage) => {
      if (!deletedMessage) {
        return res.status(404).json({ message: 'Message not found' });
      }
      res.status(200).json({ message: 'Message deleted successfully' });
    })

    .catch((err) =>
      res.status(500).json({ message: 'Message was not deleted' })
    );
};

// Add comments to a message

const addComments = (req, res) => {
  const id = req.params.id.trim();
  console.log(id);
  if (!req.body.body || req.body.body.length < 25) {
    return res
      .status(400)
      .json({ message: 'Comment must be at least 25 characters long.' });
  }
  // find the message first
  MessageModel.findById(id)
    .then((message) => {
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
      const newComment = new CommentModel({
        body: req.body.body,
        message: id,
      });

      return newComment.save().then((savedComment) => {
        message.comments.push(savedComment._id);
        return message.save().then(() => {
          res.status(201).json({ message: 'Comment added successfully' });
        });
      });
    })
    .catch((err) =>
      res.status(500).json({ message: 'Error finding the message' })
    );
};


module.exports = {
  getMessages,
  addMessage,
  editMessagePage,
  editMessageForm,
  addComments,
  deleteMessage
  
};
