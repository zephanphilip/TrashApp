const Slot = require('../models/slotModel');
const asyncHandler = require('express-async-handler');

/**
 * @desc    Get all slots
 * @route   GET /api/slots
 * @access  Private (Admin)
 */
exports.getSlots = asyncHandler(async (req, res) => {
  const slots = await Slot.find().sort({ day: 1, startTime: 1 });
  res.status(200).json(slots);
});

/**
 * @desc    Get slot by ID
 * @route   GET /api/slots/:id
 * @access  Private (Admin)
 */
exports.getSlotById = asyncHandler(async (req, res) => {
  const slot = await Slot.findById(req.params.id);
  
  if (!slot) {
    res.status(404);
    throw new Error('Slot not found');
  }
  
  res.status(200).json(slot);
});

/**
 * @desc    Create a new slot
 * @route   POST /api/slots
 * @access  Private (Admin)
 */
exports.createSlot = asyncHandler(async (req, res) => {
  const {
    location,
    coordinates,
    radius,
    day,
    timeSlot,
    startTime,
    endTime,
    maxCollections,
    isActive
  } = req.body;
  
  // Validate required fields
  if (!coordinates || !day || !timeSlot || !startTime || !endTime) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }
  
  // Check if slot already exists
  const slotExists = await Slot.findOne({
    coordinates,
    day,
    timeSlot
  });
  
  if (slotExists) {
    res.status(400);
    throw new Error('A slot with this location, day and time already exists');
  }
  
  // Create new slot
  const slot = await Slot.create({
    location,
    coordinates,
    radius,
    day,
    timeSlot,
    startTime,
    endTime,
    maxCollections,
    isActive
  });
  
  if (slot) {
    res.status(201).json(slot);
  } else {
    res.status(400);
    throw new Error('Invalid slot data');
  }
});

/**
 * @desc    Update a slot
 * @route   PUT /api/slots/:id
 * @access  Private (Admin)
 */
exports.updateSlot = asyncHandler(async (req, res) => {
  const slot = await Slot.findById(req.params.id);
  
  if (!slot) {
    res.status(404);
    throw new Error('Slot not found');
  }
  
  // Check if updating to a slot that already exists (same location, day, timeSlot)
  if (req.body.coordinates && req.body.day && req.body.timeSlot) {
    const conflictSlot = await Slot.findOne({
      coordinates: req.body.coordinates,
      day: req.body.day,
      timeSlot: req.body.timeSlot,
      _id: { $ne: req.params.id }  // Exclude current slot
    });
    
    if (conflictSlot) {
      res.status(400);
      throw new Error('A slot with this location, day and time already exists');
    }
  }
  
  // Update slot
  const updatedSlot = await Slot.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  res.status(200).json(updatedSlot);
});

/**
 * @desc    Delete a slot
 * @route   DELETE /api/slots/:id
 * @access  Private (Admin)
 */
exports.deleteSlot = asyncHandler(async (req, res) => {
  const slot = await Slot.findById(req.params.id);
  
  if (!slot) {
    res.status(404);
    throw new Error('Slot not found');
  }
  
  // Check if slot has bookings
  if (slot.bookedCount > 0) {
    res.status(400);
    throw new Error('Cannot delete slot with existing bookings');
  }
  
  await Slot.findByIdAndDelete(req.params.id);
  
  res.status(200).json({ message: 'Slot removed' });
});

/**
 * @desc    Get available slots by location
 * @route   GET /api/slots/available/:location
 * @access  Public
 */
exports.getAvailableSlotsByLocation = asyncHandler(async (req, res) => {
  // Define coordinates for each location
  const locationCoordinates = {
    'vazhakulam': [9.946804, 76.636203],
    'muvatupuzha': [9.989502, 76.579012],
    'thodupuzha': [9.895894, 76.717952]
  };
  
  const location = req.params.location.toLowerCase();
  
  if (!locationCoordinates[location]) {
    res.status(400);
    throw new Error('Invalid location');
  }
  
  const coordinates = locationCoordinates[location];
  
  // Find available slots
  const availableSlots = await Slot.findAvailableSlotsByLocation(coordinates);
  
  res.status(200).json(availableSlots);
});

/**
 * @desc    Book a slot
 * @route   POST /api/slots/:id/book
 * @access  Private (User)
 */
exports.bookSlot = asyncHandler(async (req, res) => {
  const slot = await Slot.findById(req.params.id);
  
  if (!slot) {
    res.status(404);
    throw new Error('Slot not found');
  }
  
  // Check if slot is active
  if (!slot.isActive) {
    res.status(400);
    throw new Error('This slot is not currently active');
  }
  
  // Check if slot is full
  if (slot.bookedCount >= slot.maxCollections) {
    res.status(400);
    throw new Error('This slot is already full');
  }
  
  // Increment booked count
  slot.bookedCount += 1;
  await slot.save();
  
  res.status(200).json({
    message: 'Slot booked successfully',
    slot
  });
});

/**
 * @desc    Cancel a booking
 * @route   POST /api/slots/:id/cancel
 * @access  Private (User)
 */
exports.cancelBooking = asyncHandler(async (req, res) => {
  const slot = await Slot.findById(req.params.id);
  
  if (!slot) {
    res.status(404);
    throw new Error('Slot not found');
  }
  
  // Check if there are bookings to cancel
  if (slot.bookedCount <= 0) {
    res.status(400);
    throw new Error('No bookings to cancel');
  }
  
  // Decrement booked count
  slot.bookedCount -= 1;
  await slot.save();
  
  res.status(200).json({
    message: 'Booking cancelled successfully',
    slot
  });
});