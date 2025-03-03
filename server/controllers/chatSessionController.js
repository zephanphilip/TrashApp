// controllers/chatSessionController.js
const ChatSession = require('../models/chatSession');
const Message = require('../models/message');

// Create a new chat session
exports.createSession = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Check if user already has an active session
    const existingSession = await ChatSession.findOne({ 
      userId, 
      status: 'active' 
    });
    
    if (existingSession) {
      return res.status(200).json(existingSession);
    }
    
    // Create new session
    const session = new ChatSession({ userId });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all chat sessions, optionally filtered by status
exports.getSessions = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const sessions = await ChatSession.find(filter).sort({ lastMessageAt: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get messages for a specific chat session
exports.getSessionMessages = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await ChatSession.findById(sessionId);
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    const messages = await Message.find({
      $or: [
        { senderId: session.userId, receiverId: session.adminId },
        { senderId: session.adminId, receiverId: session.userId }
      ]
    }).sort({ timestamp: 1 });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a chat session
exports.updateSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const updates = req.body;
    
    if (updates.status === 'closed') {
      updates.closedAt = Date.now();
    }
    
    const session = await ChatSession.findByIdAndUpdate(
      sessionId,
      updates,
      { new: true }
    );
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};