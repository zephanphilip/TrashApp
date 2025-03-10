// const mongoose = require('mongoose');

// const SlotSchema = new mongoose.Schema({
//   location: {
//     type: String,
//     required: [true, 'Location name is required'],
//     enum: ['Vazhakulam', 'Muvatupuzha', 'Thodupuzha']
//   },
//   coordinates: {
//     type: [Number],
//     required: [true, 'Coordinates are required'],
//     validate: {
//       validator: function(v) {
//         return v.length === 2 && !isNaN(v[0]) && !isNaN(v[1]);
//       },
//       message: props => `${props.value} is not a valid coordinate pair`
//     }
//   },
//   radius: {
//     type: Number,
//     default: 5, // Default radius in km
//     min: [1, 'Radius must be at least 1km'],
//     max: [10, 'Radius cannot exceed 10km']
//   },
//   day: {
//     type: String,
//     required: [true, 'Day is required'],
//     enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
//   },
//   timeSlot: {
//     type: String,
//     required: [true, 'Time slot is required'],
//     enum: ['Morning', 'Afternoon', 'Evening']
//   },
//   startTime: {
//     type: Date,
//     required: [true, 'Start time is required']
//   },
//   endTime: {
//     type: Date,
//     required: [true, 'End time is required'],
//     validate: {
//       validator: function(v) {
//         return v > this.startTime;
//       },
//       message: 'End time must be after start time'
//     }
//   },
//   maxCollections: {
//     type: Number,
//     default: 5,
//     min: [1, 'Maximum collections must be at least 1'],
//     max: [20, 'Maximum collections cannot exceed 20']
//   },
//   bookedCount: {
//     type: Number,
//     default: 0,
//     min: 0
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true
// });

// // Create compound index for location, day and timeSlot to ensure uniqueness
// SlotSchema.index({ 
//   coordinates: 1, 
//   day: 1, 
//   timeSlot: 1 
// }, { 
//   unique: true,
//   name: 'unique_slot_index' 
// });

// // Virtual field to check if slot is full
// SlotSchema.virtual('isFull').get(function() {
//   return this.bookedCount >= this.maxCollections;
// });

// // Virtual field to get available slots
// SlotSchema.virtual('availableSlots').get(function() {
//   return Math.max(0, this.maxCollections - this.bookedCount);
// });

// // Static method to find available slots by location
// SlotSchema.statics.findAvailableSlotsByLocation = async function(coordinates) {
//   return this.find({
//     coordinates: coordinates,
//     isActive: true,
//     $expr: { $lt: ["$bookedCount", "$maxCollections"] }
//   }).sort({ day: 1, startTime: 1 });
// };

// module.exports = mongoose.model('Slot', SlotSchema);

const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  location: {
    type: String,
    required: [true, 'Location name is required'],
    enum: ['Vazhakulam', 'Muvatupuzha', 'Thodupuzha']
  },
  coordinates: {
    type: [Number],
    required: [true, 'Coordinates are required'],
    validate: {
      validator: function(v) {
        return v.length === 2 && !isNaN(v[0]) && !isNaN(v[1]);
      },
      message: props => `${props.value} is not a valid coordinate pair`
    }
  },
  radius: {
    type: Number,
    default: 5, // Default radius in km
    min: [1, 'Radius must be at least 1km'],
    max: [10, 'Radius cannot exceed 10km']
  },
  day: {
    type: String,
    required: [true, 'Day is required'],
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  timeSlot: {
    type: String,
    required: [true, 'Time slot is required'],
    enum: ['Morning', 'Afternoon', 'Evening']
  },
  startTime: {
    type: Date,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: Date,
    required: [true, 'End time is required']
    // Removed the validator from here - we'll validate in the controller
  },
  maxCollections: {
    type: Number,
    default: 5,
    min: [1, 'Maximum collections must be at least 1'],
    max: [20, 'Maximum collections cannot exceed 20']
  },
  bookedCount: {
    type: Number,
    default: 0,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create compound index for location, day and timeSlot to ensure uniqueness
SlotSchema.index({ 
  coordinates: 1, 
  day: 1, 
  timeSlot: 1 
}, { 
  unique: true,
  name: 'unique_slot_index' 
});

// Virtual field to check if slot is full
SlotSchema.virtual('isFull').get(function() {
  return this.bookedCount >= this.maxCollections;
});

// Virtual field to get available slots
SlotSchema.virtual('availableSlots').get(function() {
  return Math.max(0, this.maxCollections - this.bookedCount);
});

// Static method to find available slots by location
SlotSchema.statics.findAvailableSlotsByLocation = async function(coordinates) {
  return this.find({
    coordinates: coordinates,
    isActive: true,
    $expr: { $lt: ["$bookedCount", "$maxCollections"] }
  }).sort({ day: 1, startTime: 1 });
};

module.exports = mongoose.model('Slot', SlotSchema);