const express = require('express');
const router = express.Router();
const {
  getSlots,
  getSlotById,
  createSlot,
  updateSlot,
  deleteSlot,
  getAvailableSlotsByLocation,
  bookSlot,
  cancelBooking
} = require('../controllers/slotController');



// Routes that need admin access
router.route('/')
  .get(getSlots)
  .post(createSlot);

router.route('/:id')
  .get(getSlotById)
  .put(updateSlot)
  .delete(deleteSlot);

// Public route for available slots
router.route('/available/:location')
  .get(getAvailableSlotsByLocation);

// User routes for booking
router.route('/:id/book')
  .post(bookSlot);

router.route('/:id/cancel')
  .post(cancelBooking);

module.exports = router;