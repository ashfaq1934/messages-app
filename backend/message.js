const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    message: String,
    title: String,
    recipient: String,
    uuid: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      },
  });
  
const Message = mongoose.model("message", messageSchema);

module.exports = Message;
