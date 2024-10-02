const mongoose = require("mongoose");

const schema = mongoose.Schema;
const experienceSchema = new schema({
  years_of_experience: {
    type: Number,
  },
  company: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  work_description: {
    type: String,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const exp = mongoose.model("Experience", experienceSchema);
module.exports = exp;
