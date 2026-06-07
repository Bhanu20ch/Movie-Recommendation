const Review = require("../models/Review");

const Movie = require("../models/Movie");
const UserMovieStatus = require("../models/UserMovieStatus");
const addReview = async (req, res) => {
  try {
    let review = await Review.findOne({
      userId: req.body.userId,
      movie: req.body.movie,
    });

    if (review) {
      review.rating = req.body.rating;
      review.comment = req.body.comment;

      await review.save();
    } else {
      review = await Review.create(req.body);
    }
    await UserMovieStatus.findOneAndUpdate(
      {
        userId: req.body.userId,
        movieId: req.body.movie,
      },
      {
        status: "watched",
      },
      {
        upsert: true,
        new: true,
      },
    );
    const reviews = await Review.find({
      movie: req.body.movie,
    });

    const totalRatings = reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );

    const averageRating = totalRatings / reviews.length;

    await Movie.findByIdAndUpdate(req.body.movie, {
      averageRating,
    });

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
