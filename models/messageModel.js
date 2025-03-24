const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
        minlength:25,
    
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
    date: {
        type: Date,
        default:Date.now
    }

});
module.exports = mongoose.model("Message", messageSchema);
