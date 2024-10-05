const mongoose = require("mongoose");

const ratingSchema = require("./Rating");
const reviewSchema = require("./Review");

const activitySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    duration: Number,
    time: {
      type: Date,
      // required: true,
    },
    locations: {
      lon: String,
      lan: String,
    },
    price: {
      range: {
        min: Number,
        max: Number,
      },
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    discount: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "PreferenceTag",
      },
    ],
    bookingOpened: {
      type: Boolean,
      default: true,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10, // Rounding ratings
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
