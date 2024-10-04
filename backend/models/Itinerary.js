const mongoose = require("mongoose");

const schema = mongoose.Schema;
const activitySchema = require("./Activity");
const locationSchema = require("./Location");
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
  isBooked: {
    type: Boolean,
    default: false,
  },
  booked_users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default:[]
    },
  ],
});
const itinerary = mongoose.model("Itinerary", itinerarySchema);
module.exports = itinerary;
