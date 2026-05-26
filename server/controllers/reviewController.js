const Review = require("../models/Review");

const addReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMovieReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      movie: req.params.movieId,
    });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
  getMovieReviews,
};
