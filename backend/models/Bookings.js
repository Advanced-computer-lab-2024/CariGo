const { boolean } = require("joi");
const mongoose = require("mongoose");
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
