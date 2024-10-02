const mongoose = require("mongoose");

const schema = mongoose.Schema;
const activitySchema = require("./Activity");
const locationSchema = require("./Location");
const itinerarySchema = new schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  activities: [{
    type: mongoose.Schema.ObjectId,
    default: undefined,
  }],
  language: String,
  price: Number,
  location: {
    pick_up: String,
    drop_off: String,
  },
  availability: {
    dates: [Date], // time will be included in Date
  },
});
const itinerary = mongoose.model("Itinerary", itinerarySchema);
module.exports = itinerary;
