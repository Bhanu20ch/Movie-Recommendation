const UserMovieStatus = require("../models/UserMovieStatus");

const updateMovieStatus = async (req, res) => {
  try {
    const { userId, movieId, status } = req.body;

    const existingStatus = await UserMovieStatus.findOne({
      userId,
      movieId,
    });

    if (existingStatus) {
      existingStatus.status = status;

      await existingStatus.save();

      return res.status(200).json(existingStatus);
    }

    const newStatus = await UserMovieStatus.create({
      userId,
      movieId,
      status,
    });

    res.status(201).json(newStatus);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const mongoose = require("mongoose");

const getMovieStatus = async (req, res) => {
  try {
    const { userId, movieId } = req.params;

    const status = await UserMovieStatus.findOne({
      userId,
      movieId: new mongoose.Types.ObjectId(movieId),
    });

    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getUserStatuses = async (req, res) => {
  try {
    const statuses = await UserMovieStatus.find({
      userId: req.params.userId,
    });

    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  updateMovieStatus,
  getMovieStatus,
  getUserStatuses,
};
