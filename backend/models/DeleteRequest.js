const mongoose = require("mongoose");

const deleteRequestSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
    },

    start_date: {
      type: Date,
      required: true,
    },

    allowDelete: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const DeleteRequest = mongoose.model("DeleteRequest", deleteRequestSchema); // Fixed spelling here
module.exports = DeleteRequest;
