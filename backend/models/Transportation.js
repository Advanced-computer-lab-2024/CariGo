const mongoose = require("mongoose");

const ratingSchema = require("./Rating");
const reviewSchema = require("./Review");

const TransportationSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    driverNumber: {
      type: Number,
    },
    carType: {
      type: String,
      enum: ['car', 'bus', 'motorCycle'], // Fixed the enum values
    },
    plateNumber: {
      type: String, // Change to String for plate numbers
    },
    date: {
      type: Date,
      required: true,
    },
    departureTime: {
      hours: Number,
      minutes: Number,
      dayTime: String,
     
    },
    duration: Number,
    arrivalTime: {
      hours: Number,
      minutes: Number,
      dayTime: String,
      
    },
    departureLocation: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
      description: String,
    },
    arrivalLocation: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
      description: String,
    },
    price: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    ac: {
      type: Boolean,
    },
    remainingSeats: {
      type: Number,
    },
    bookingOpened: {
      type: Boolean,
      default: true,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10, // Rounding ratings
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    isBooked:{
      type: Boolean,
      default: false,
    },
    isActive :{
      type :Boolean,
      default :true
    }
  },
  { timestamps: true }
);

// Create geospatial indexes
TransportationSchema.index({ departureLocation: '2dsphere' });
TransportationSchema.index({ arrivalLocation: '2dsphere' });

const Transportation = mongoose.model("Transportation", TransportationSchema);
module.exports = Transportation;
