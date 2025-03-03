// routes/chatSessionRoutes.js
const express = require('express');
const router = express.Router();
const chatSessionController = require('../controllers/chatSessionController');

// POST /api/chatsessions - Create a new chat session
router.post('/', chatSessionController.createSession);

// GET /api/chatsessions - Get all chat sessions
router.get('/', chatSessionController.getSessions);

// GET /api/chatsessions/:sessionId/messages - Get messages for a session
router.get('/:sessionId/messages', chatSessionController.getSessionMessages);

// PATCH /api/chatsessions/:sessionId - Update a chat session
router.patch('/:sessionId', chatSessionController.updateSession);

module.exports = router;