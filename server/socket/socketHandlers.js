// socket/socketHandlers.js
const Message = require('../models/message');
const ChatSession = require('../models/chatSession');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    
    // Join a room with the user's ID
    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });
    
    socket.on('chat message', async (data) => {
      try {
        const { senderId, receiverId, message, senderType, sessionId } = data;
        
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
        
        // Send to the specific room
        io.to(receiverId).emit('message', newMessage);
        
        // Also send confirmation back to sender
        socket.emit('message sent', newMessage);
      } catch (error) {
        console.error('Error sending message:', error);
        socket.emit('message error', { error: error.message });
      }
    });
    
    socket.on('typing', (data) => {
      const { senderId, receiverId } = data;
      socket.to(receiverId).emit('typing', { senderId });
    });
    
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};