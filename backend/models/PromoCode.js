const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Promo code must have a code'],
    unique: true,
  },
  discount: {
    type: Number,
    required: [true, 'Promo code must have a discount value'],
    min: [0, 'Discount must be at least 0'],
  },
  expirationDate: {
    type: Date,
    required: [true, 'Promo code must have an expiration date'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  usedUsers:{
    type: [mongoose.Schema.ObjectId],
  },
  codeType:{
    type: String, // Specify the type as String
    enum: ["birthDay", "normal"],
    default: "normal",
  }
});

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);

module.exports = PromoCode;
