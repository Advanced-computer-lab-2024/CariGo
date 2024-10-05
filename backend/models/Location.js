const mongoose = require("mongoose");

const schema = mongoose.Schema;

const locationSchema = new schema({
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
  nation: {
    country: String,
    city: String,
  },
});

module.exports = locationSchema;
