const mongoose = require("mongoose");
const schema = mongoose.Schema;
const location = require("./Location");
const tag = require("./Tag");
const vintageSchema = new schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  name: String,
  description: String,
  pictures: [String],
  location: location,
  ticket_price: {
    foriegner: {
      type: Number,
      default: 0,
    },
    native: {
      type: Number,
      default: 0,
    },
    student: {
      type: Number,
      default: 0,
    },
  },
  tags: {
    type: [String],
    default:[],
  },
  opening_hours: {
    opening: String,
    closing: String,
  }
});
const vintage = mongoose.model("Vintage", vintageSchema);
module.exports = vintage;
