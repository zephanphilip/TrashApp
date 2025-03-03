const Order = require("../models/orderModel")

// Add a new item
// cartController.js
const addItem = async(req,res) => {
  try {
    // Log the incoming request body
    console.log('Received order data:', req.body);

    // Ensure items is properly parsed if it's coming as a string
    let items = req.body.items;
    if (typeof items === 'string') {
      items = JSON.parse(items);
    }

    // Create new order with parsed items
    const newOrder = new Order({
      userId: req.body.userId,
      items: items,
      totalAmount: req.body.totalAmount,
      status: req.body.status || 'pending',
      pickupLocation: req.body.pickupLocation,
      pickupSlot: req.body.pickupSlot,
      coordinates: req.body.coordinates
    });

    // Save the order
    const savedOrder = await newOrder.save();
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: savedOrder
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
  }

  const getPendingOrders = async (req, res) => {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
      }
      
      const orders = await Order.find({ 
        userId: userId,
        status: { $ne: 'completed' }
      }).sort({ createdAt: -1 });
      
      res.status(200).json({
        success: true,
        count: orders.length,
        orders: orders
      });
    } catch (error) {
      console.error('Error fetching pending orders:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch pending orders',
        error: error.message
      });
    }
  };

  const getAllPendingOrders = async (req, res) => {
    try {
      const orders = await Order.find({ 
        status: { $ne: 'completed' }
      }).sort({ createdAt: -1 });
      
      res.status(200).json({
        success: true,
        count: orders.length,
        orders: orders
      });
    } catch (error) {
      console.error('Error fetching pending orders:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch pending orders',
        error: error.message
      });
    }
  };

  // Mark an order as collected/completed
const markOrderAsCollected = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the order and update its status to completed
    const order = await Order.findByIdAndUpdate(
      id,
      { 
        status: 'completed',
        // We're updating the status from 'pending' to 'completed' as per your schema
        // The schema doesn't have a 'collectedAt' field, so we're not adding that
      },
      { new: true, runValidators: true }
    );
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Optional: You could add code here to notify the user that their order is completed
    
    res.status(200).json({
      success: true,
      message: 'Order marked as collected successfully',
      order: order
    });
    
  } catch (error) {
    console.error('Error marking order as collected:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
};
// Process an order (optional - if you want a middle step between pending and completed)
const processOrder = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findByIdAndUpdate(
      id,
      { status: 'processing' },
      { new: true, runValidators: true }
    );
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Order is now being processed',
      order: order
    });
    
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
};

module.exports = {addItem, getPendingOrders, getAllPendingOrders,markOrderAsCollected, processOrder}