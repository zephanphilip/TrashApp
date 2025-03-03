const express = require('express');

const {postReview,getAllReviews} = require('../controllers/reviewController');

const router = express.Router();

router.post('/', postReview);
router.get('/', getAllReviews);


module.exports = router;