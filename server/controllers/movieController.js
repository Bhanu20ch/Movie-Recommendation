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

    const movies = await Movie.find().skip(skip).limit(limit);

    res.status(200).json(movies);
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
    const query = req.query.q;
    const synonymMap = {
      science: "Sci-Fi",
      sci: "Sci-Fi",
      funny: "Comedy",
      humor: "Comedy",
      romantic: "Romance",
      romance: "Romance",
      actionful: "Action",
      space: "Sci-Fi",
    };

    const searchTerm = synonymMap[query.toLowerCase()] || query;

    const movies = await Movie.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { genres: { $regex: searchTerm, $options: "i" } },
        { language: { $regex: searchTerm, $options: "i" } },
        { director: { $regex: searchTerm, $options: "i" } },
      ],
    });

    res.status(200).json(movies);
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
