const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    poster: {
      type: String,
    },

    genres: [
      {
        type: String,
      },
    ],

    language: {
      type: String,
    },

    director: {
      type: String,
    },

    cast: [
      {
        type: String,
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
