const Movie = require("../models/Movie");

const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    const totalMovies = await Movie.countDocuments();

    const movies = await Movie.find().skip(skip).limit(limit);

    res.status(200).json({
      movies,
      totalMovies,
      currentPage: page,
      totalPages: Math.ceil(totalMovies / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const searchMovies = async (req, res) => {
  try {
    const { title, genre, language } = req.query;

    const query = {};

    if (title && title.trim() !== "") {
      query.title = {
        $regex: title,
        $options: "i",
      };
    }

    if (genre && genre !== "") {
      query.genres = genre;
    }

    if (language && language !== "") {
      query.language = language;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    const totalMovies = await Movie.countDocuments(query);

    const movies = await Movie.find(query).skip(skip).limit(limit);

    res.status(200).json({
      movies,
      totalPages: Math.ceil(totalMovies / limit),
      currentPage: page,
      totalMovies,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createMovie,
  getMovies,
  getMovieById,
  searchMovies,
};
