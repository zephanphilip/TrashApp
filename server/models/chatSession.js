// models/chatSession.js
const mongoose = require('mongoose');

const chatSessionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  adminId: { type: String, default: null },
  status: { type: String, enum: ['active', 'closed'], default: 'active' },
  startedAt: { type: Date, default: Date.now },
  closedAt: { type: Date },
  lastMessageAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatSession', chatSessionSchema);