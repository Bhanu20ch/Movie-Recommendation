const express = require("express");

const router = express.Router();

const {
  updateMovieStatus,
  getMovieStatus,
  getUserStatuses,
} = require("../controllers/userMovieStatusController");

router.post("/", updateMovieStatus);
router.get("/user/:userId", getUserStatuses);
router.get("/:userId/:movieId", getMovieStatus);

module.exports = router;
