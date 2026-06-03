const mongoose = require("mongoose");

const userMovieStatusSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    status: {
      type: String,
      enum: ["watched", "favorite", "watch_later"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("UserMovieStatus", userMovieStatusSchema);
