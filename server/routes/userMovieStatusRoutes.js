const express = require("express");

const router = express.Router();

const {
  updateMovieStatus,
  getMovieStatus,
} = require("../controllers/userMovieStatusController");

router.post("/", updateMovieStatus);

router.get("/:userId/:movieId", getMovieStatus);

module.exports = router;
