const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      userEmail: {
        type: String,
        required: true,
      },
      review: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      }
})

module.exports = mongoose.model('Review', reviewSchema)