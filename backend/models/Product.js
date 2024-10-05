const mongoose = require("mongoose");
const ratingSchema = require("./Rating");
const reviewSchema = require("./Review");
const schema = mongoose.Schema;

const productSchema = new schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User", // Refers to the 'User' model
    },
    name: {
      type: String,
      required: true, // Make it required if it's necessary
    },
    picture: {
      type: String, // You can specify a URL or file path for the picture
    },
    price: {
      type: Number,
      default: 0.0, // Default price is 0.0
    },
    description: {
      type: String,
    },
    ratingsAverage: { 
      avgSoFar: {type:Number, default:2.5 // 3shan el msdaqeya
      },
      contributers:{type:Number, default:0
      }
    },
    quantity: {
      type: Number,
      required: true, // Make it required if necessary
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product; // Exporting the Product model
