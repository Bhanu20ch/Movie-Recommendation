const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    kaggleId: {
      type: Number, // Use String instead if your CSV ids aren't numeric
      required: true,
      unique: true,
    },

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
movieSchema.index({ title: 1 });
movieSchema.index({ genres: 1 });
movieSchema.index({ language: 1 });
module.exports = mongoose.model("Movie", movieSchema);
