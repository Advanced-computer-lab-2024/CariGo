const mongoose = require("mongoose");
const ratingSchema = require("./Rating");
const reviewSchema = require("./Review");
const schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String, // The main image path
      // required: true,
    },
    images: [String], // Array to hold other image paths
    price: {
      type: Number,
      default: 0.0,
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: val => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
      archived: { // New field to indicate whether the product is archived
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
