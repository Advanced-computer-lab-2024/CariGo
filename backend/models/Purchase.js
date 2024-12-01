const mongoose = require("mongoose");
const schema = mongoose.Schema;

const purchaseSchema = new schema(
  {
    UserId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    ProductId: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
    Quantity: {
      type: Number,
      required: true,
    },
    isCancelled :{
      type :Boolean ,
      default :false
    }
  },
  { timestamps: true }
);

const purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = purchase;
