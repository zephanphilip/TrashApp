const express = require('express');

const {AnalyseReview, ChatbotResponse} = require('../controllers/aiController');

const router = express.Router();

router.post('/analysereview', AnalyseReview);
// Chatbot endpoint
router.post('/chat', ChatbotResponse);


module.exports = router;
