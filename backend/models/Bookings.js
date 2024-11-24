const { boolean } = require("joi");
const mongoose = require("mongoose");
const Transportation = require("./Transportation");
const schema = mongoose.Schema;

const BookingSchema = new schema({
  UserId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  ActivityId: {
    type: mongoose.Schema.ObjectId,
    ref: "Activity",
  },
  ItineraryId: {
    type: mongoose.Schema.ObjectId,
    ref: "Itinerary",
  },
  TransportationId :{
    type: mongoose.Schema.ObjectId,
    ref: "Transportation",
  },
  hotelData: Object,
  flightData: Object,
  Status: {
    type: Boolean,
    default: true,
  },
  PaymentMethod: {
    type: String,
    enum: ["Wallet", "Card"],
  },
  CardNumber: {
    type: String,
    default: "",
  },
  NumberOfTickets: {
    type: Number,
    
  },
  TotalPrice: {
    type: Number,
    
  },
 
} ,{ timestamps: true });

BookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "ItineraryId",
  });
  next();
});

// Populate ActivityId if it's defined, otherwise populate ItineraryId
BookingSchema.pre(/^find/, function (next) {
    this.populate({
      path: "ActivityId", // Correcting the path to match the field name
    });
  next();
});

BookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "TransportationId", // Correcting the path to match the field name
  });
next();
});

const Bookings = mongoose.model("Bookings", BookingSchema);

module.exports = Bookings;
