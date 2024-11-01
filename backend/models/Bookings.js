const mongoose = require("mongoose");
const schema = mongoose.Schema;

const BookingSchema = new schema({
  BookedUsers: {
    type: [mongoose.Schema.ObjectId],
    ref: "User",
  },
  event: {
    type: mongoose.Schema.ObjectId,
    ref: "Activity",
  },
});
const Bookings = mongoose.model("Bookings", BookingSchema);
module.exports = Bookings;
