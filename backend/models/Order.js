const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
      default: "processing",
      enum: ["processing", "shipped", "delivered", "cancelled"],
    },
    deliveryDate: {
      type: Date,
    },
    isCancelled :{
      type :Boolean,
      default :false
    }
    , purchaseIds: [{ 
      type: Schema.Types.ObjectId, 
      ref: "Purchase",  // Reference to the Purchase model
    }],
  },
  {
    timestamps: true,
  }
);
OrderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "products.productId", // Populating the `productId` in each item of the `products` array
    select: "name price images", // Selecting only the fields you need (e.g., name and price of the product)
  });
  next();
});
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
