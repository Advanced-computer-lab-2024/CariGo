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
  HotelId :{
    type :String
  },
FlightId :{
    type :String
  },
  Status: {
    type:Boolean,
    default: true,
  },
  PaymentMethod: {
    type: String,
    enum: [
      "Cash",
      "Card",
    ],
  },
  CardNumber:{
    type: String,
    default:"",
  }
});

BookingSchema.pre(/^find/, function (next) {
  this.populate({
      path: 'ItineraryId',
      select: 'author category activities',
  });
  next();
});


const Bookings = mongoose.model("Bookings", BookingSchema);

module.exports = Bookings;
