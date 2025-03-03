// models/message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  senderType: { type: String, enum: ['user', 'admin'], required: true }
});

module.exports = mongoose.model('Message', messageSchema);