// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// POST /api/messages - Create a new message
router.post('/', messageController.createMessage);

module.exports = router;