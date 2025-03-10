const User = require('../models/Users');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    let user = await User.findOne({ userId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create or update user
exports.createOrUpdateUser = async (req, res) => {
  try {
    const { userId, fullName, email } = req.body;
    
    if (!userId || !fullName || !email) {
      return res.status(400).json({ message: 'User ID, full name, and email are required' });
    }
    
    // Try to find the user first
    let user = await User.findOne({ userId });
    
    if (user) {
      // Update existing user
      user.fullName = fullName;
      user.email = email;
      await user.save();
    } else {
      // Create new user
      user = new User({
        userId,
        fullName,
        email
      });
      await user.save();
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update account type
exports.updateAccountType = async (req, res) => {
  try {
    const { userId, accountType } = req.body;
    
    if (!userId || !accountType) {
      return res.status(400).json({ message: 'User ID and account type are required' });
    }
    
    if (!['individual', 'school', 'industry'].includes(accountType)) {
      return res.status(400).json({ message: 'Invalid account type. Must be individual, school, or industry' });
    }
    
    let user = await User.findOne({ userId });
    
    if (!user) {
      // Create user if not exists
      user = new User({
        userId,
        fullName: 'User', // Default name
        email: 'user@example.com', // Default email
        accountType
      });
    } else {
      // Update existing user
      user.accountType = accountType;
    }
    
    await user.save();
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating account type:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get users by account type
exports.getUsersByAccountType = async (req, res) => {
  try {
    const { accountType } = req.params;
    
    if (!['individual', 'school', 'industry', 'all'].includes(accountType)) {
      return res.status(400).json({ message: 'Invalid account type. Must be individual, school, industry, or all' });
    }
    
    let query = {};
    if (accountType !== 'all') {
      query.accountType = accountType;
    }
    
    const users = await User.find(query);
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users by account type:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};