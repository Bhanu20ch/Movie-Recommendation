const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    poster: {
      type: String,
      required: true,
    },

    genres: [
      {
        type: String,
        required: true,
      },
    ],

    language: {
      type: String,
      required: true,
    },

    director: {
      type: String,
      required: true,
    },

    cast: [
      {
        type: String,
        required: true,
      },
    ],

    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Movie", movieSchema);
