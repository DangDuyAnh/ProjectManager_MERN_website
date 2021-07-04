const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  room: { type: String, required: true },
  message: { type: String}
}, {
  timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);
 
module.exports = Message;