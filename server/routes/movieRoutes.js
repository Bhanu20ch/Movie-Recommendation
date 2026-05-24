const express = require("express");

const router = express.Router();

const {
  createMovie,
  getMovies,
  getMovieById,
  searchMovies,
} = require("../controllers/movieController");

router.post("/", createMovie);
router.get("/", getMovies);
router.get("/search", searchMovies);
router.get("/:id", getMovieById);

module.exports = router;
