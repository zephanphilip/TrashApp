const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get user profile by ID
router.get('/:userId', userController.getUserProfile);

// Create or update user
router.post('/', userController.createOrUpdateUser);

// Update account type
router.post('/accounttype', userController.updateAccountType);

// Get users by account type
router.get('/filter/:accountType', userController.getUsersByAccountType);

module.exports = router;