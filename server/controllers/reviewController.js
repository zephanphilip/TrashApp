const Review = require("../models/reviewModel");

// POST: Submit a new review
  const postReview = async(req,res) => {
    try {
        const { userId, userName, userEmail, review, rating, timestamp } = req.body;
        
        // Validate required fields
        if (!userId || !userName || !review || !rating) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
        
        // Validate rating
        if (rating < 1 || rating > 5) {
          return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }
        
        // Create new review
        const newReview = new Review({
          userId,
          userName,
          userEmail,
          review,
          rating,
          timestamp: timestamp || new Date()
        });
        
        // Save to database
        await newReview.save();
        
        return res.status(201).json({ 
          message: 'Review submitted successfully',
          reviewId: newReview._id 
        });
        
      } catch (error) {
        console.error('Error submitting review:', error);
        return res.status(500).json({ error: 'Failed to submit review' });
      }
  }


  const getAllReviews = async (req, res) => {
    try {
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const reviews = await Review.find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit);
          
        const total = await Review.countDocuments();
        
        return res.status(200).json({
          reviews,
          pagination: {
            total,
            page,
            pages: Math.ceil(total / limit)
          }
        });
        
      } catch (error) {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({ error: 'Failed to fetch reviews' });
      }
  }

  module.exports = {postReview,getAllReviews}