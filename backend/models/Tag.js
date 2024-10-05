const mongoose = require("mongoose");

const schema = mongoose.Schema;
const PreferenceTagSchema = new schema({

  title:{
    type: String,
    required: true,
  }
});

const tag = mongoose.model("Tag", PreferenceTagSchema);
module.exports = tag;
