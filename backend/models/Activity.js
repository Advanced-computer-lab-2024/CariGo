const mongoose = require("mongoose");

const schema = mongoose.Schema;
const ratingSchema = require("./Rating");
const reviewSchema = require("./Review");

const activitySchema = new schema({
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
    required: true,
  },
  locations: [
    {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"], // Ensure the value is always 'Point'
      },
      coordinates: {
        type: [Number], // Format: [longitude, latitude]
        required: true,
      },
      address: String,
      description: String,
      day: Number,
    },
  ],
  price: {
    range: {
      min: Number,
      max: Number,
    },
  },
  category: {
     type: mongoose.Schema.ObjectId,
        ref: 'Category',
  },
  discount: {
    type: Number,
    default: 0,
  },
  tags: {
    // Admins' tags  (preferences)
    type: [String],
    default: undefined,
  },
  isOpened: {
    type: Boolean,
    default: true,
  },
  reviews: {
    type: mongoose.Schema.ObjectId,
    ref: 'Review',
  },
});
// const activity = mongoose.model("Activity", activitySchema);
module.exports = activitySchema;
