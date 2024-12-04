const mongoose = require("mongoose");

const ratingSchema = require("./Rating");
const reviewSchema = require("./Review");

const activitySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: [200, "Description must be less than or equal to 200 characters"],
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
      type: Number,
    },
    Category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    discount: {
      type: Number,
      default: 0,
    },
    tag: {
      type: mongoose.Schema.ObjectId,
      ref: "Tag",
    },
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
    isFlagged: {
      type: Boolean,
      default: false,
    },
    isBooked:{
      type: Boolean,
      default: false,
    },
    isActive :{
      type :Boolean,
      default :true
    },
    isOpened:{
      type :Boolean,
      default :false
    },
    interestedUsers:[
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      }
    ]
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
