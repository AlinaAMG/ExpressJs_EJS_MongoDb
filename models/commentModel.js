const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
      minlength: [25, 'Comment must be at least 25 characters long.'],
    },

    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      required:true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
