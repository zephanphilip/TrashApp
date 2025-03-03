// controllers/messageController.js
const Message = require('../models/message');
const ChatSession = require('../models/chatSession');

// Create a new message
exports.createMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message, senderType, sessionId } = req.body;
    
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      senderType
    });
    
    await newMessage.save();
    
    // Update chat session's last message timestamp
    await ChatSession.findByIdAndUpdate(sessionId, {
      lastMessageAt: Date.now()
    });
    
    // Note: Socket emission happens in the socket handler, not here
    
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};