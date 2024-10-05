const mongoose = require("mongoose");

const schema = mongoose.Schema;
const itinerarySchema = new schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  activities: [
    {
      name: String,
      strat_date: Date,
      end_date: Date,
      description: String,
    },
  ],
  strat_date: Date,
  end_date: Date,
  transportation: String,
  accommodation: String,
  language: String,
  price: Number,
  locations: {
    type: [String],
    required: true,
  },
  pick_up: String,
  drop_off: String,
  availability: {
    dates: [Date], // time will be included in Date
  },
  accessibility: String,
  isBooked: {
    type: Boolean,
    default: false,
  },
  booked_users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5.0"],
    set: (val) => Math.round(val * 10) / 10, // Rounding ratings
  },
  tags: { type: [String], default: [] },
});
const itinerary = mongoose.model("Itinerary", itinerarySchema);
module.exports = itinerary;
