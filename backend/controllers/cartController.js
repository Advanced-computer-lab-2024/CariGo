const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Purchase = require("../models/Purchase");
const schedule = require("node-schedule");
const moment = require("moment");

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate(
      "products.productId",
      "name price ratingsAverage mainImage"
    );
    if (!cart) {
      const cartCreated = new Cart({ userId, products: [] });
      return res.status(201).json(cartCreated);
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editProductInCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    // Validate quantity input
    if (quantity === 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater or less than zero" });
    }

    // Find or create the user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] }); // Initialize a new cart if not found
    }

    // Find the product in the database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if there is enough stock for the requested quantity change
    const existingProductIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    let updatedQuantity = quantity;

    if (existingProductIndex > -1) {
      updatedQuantity = cart.products[existingProductIndex].quantity + quantity;
    }

    if (updatedQuantity > product.quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    // Update or remove product from the cart
    if (existingProductIndex > -1) {
      if (updatedQuantity <= 0) {
        cart.products.splice(existingProductIndex, 1); // Remove product from cart
      } else {
        cart.products[existingProductIndex].quantity = updatedQuantity;
      }
    } else if (quantity > 0) {
      cart.products.push({ productId, quantity }); // Add new product to cart
    }

    await cart.save(); // Save updated cart to the database
    res.status(200).json(cart); // Send updated cart in response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    // Validate input
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.products.length === 0) {
      return res.status(404).json({ message: "Cart is empty or not found" });
    }

    // Find the product index in the cart
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remove the product from the cart
    cart.products.splice(productIndex, 1);

    // Save the updated cart
    await cart.save();
    res.status(200).json({ message: "Product removed successfully", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }); // Find the user's cart
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.products = []; // Clear the cart
    await cart.save(); // Save the updated cart
    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkout = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingAddress,PaymentMethod,paymentAmount } = req.body;

    // Find the user's cart and populate product details
    const cart = await Cart.findOne({ userId }).populate(
      "products.productId",
      "name price quantity"
    );

    if (!cart || cart.products.length === 0) {
      return res.status(404).json({ message: "Cart is empty or not found" });
    }

    // Check stock availability and calculate total price
    let totalOrderPrice = paymentAmount;
    for (const item of cart.products) {
      const product = item.productId;

      // Check if enough stock is available
      if (item.quantity > product.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}. Available: ${product.quantity}`,
        });
      }
      
    }
    const user = await User.findById(userId);
    if(PaymentMethod === "wallet"){
      const newWalletValue = user.wallet - totalOrderPrice;
      user.wallet = newWalletValue;
      await user.save({ validateBeforeSave: false });
    }
      // Add loyalty points
      // user.addLoyaltyPoints(itinerary.price);
      user.addLoyaltyPoints(totalOrderPrice);
      user.addAvailablePoints(totalOrderPrice);
      await user.save({ validateBeforeSave: false });
    let purchaseIds = [];
    for (const item of cart.products) {
      let purchase = await Purchase.create({
        UserId: userId,
        ProductId: item.productId._id,
        Quantity: item.quantity,
      });
      purchaseIds.push(purchase._id);
      console.log("new purchase is " + purchase);
    }
    // Create the order
    const order = await Order.create({
      userId,
      products: cart.products.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        totalPrice: item.productId.price * item.quantity,
      })),
      PaymentMethod,
      shippingAddress,
      totalPrice: totalOrderPrice,
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      purchaseIds,
    });

    // Update product stock after order creation
    for (const item of cart.products) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: { quantity: -item.quantity },
      });
    }

    // Clear the user's cart
    cart.products = [];
    await cart.save();

    res.status(200).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Schedule job to run every day at midnight
const updateOrderStates = schedule.scheduleJob("0 0 * * *", async () => {
  try {
    const today = new Date();

    // Find all non-cancelled orders
    const orders = await Order.find({ state: { $ne: "cancelled" } });

    for (const order of orders) {
      const daysUntilDelivery = Math.ceil(
        (order.deliveryDate - today) / (1000 * 60 * 60 * 24)
      );

      if (daysUntilDelivery <= 0) {
        order.state = "delivered";
      } else if (daysUntilDelivery <= 5) {
        order.state = "shipped";
      } else {
        order.state = "processing";
      }

      await order.save();
    }
  } catch (error) {
    console.error("Error updating order states:", error);
  }
});

const CancelOrder = async (req, res) => {
  const UserId = req.user.id; // User ID from the request body (authenticated user)
  const { OrderId } = req.body; // Order ID from the request body

  // Check if the provided OrderId and UserId are valid ObjectIds
  if (
    mongoose.Types.ObjectId.isValid(OrderId) &&
    mongoose.Types.ObjectId.isValid(UserId)
  ) {
    try {
      // Fetch the order to be canceled
      const order = await Order.findById(OrderId); // Populate product details

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Check if the order belongs to the logged-in user
      if (order.userId.toString() !== UserId) {
        return res
          .status(403)
          .json({ message: "Unauthorized to cancel this order" });
      }

      for (const item of order.products) {
        await Product.findByIdAndUpdate(item.productId._id, {
          $inc: { quantity: item.quantity },
        });
      }

      // Mark the order as canceled in the Order model
      order.isCancelled = true;
      await order.save(); // Save the updated order
      if (order.purchaseIds && order.purchaseIds.length > 0) {
        await Purchase.updateMany(
          { _id: { $in: order.purchaseIds } }, // Find purchases whose _id is in the purchaseIds array
          { $set: { isCancelled: true } } // Set isCancelled to true for those purchases
        );
      }

      // Respond with a success message
      res.status(200).json({ message: "Order canceled successfully", order });
    } catch (error) {
      // Catch any errors and send a failure response
      console.error("Error canceling order:", error);
      res
        .status(500)
        .json({
          message: "Error processing cancellation",
          error: error.message,
        });
    }
  } else {
    res.status(400).json({ message: "Invalid OrderId or UserId" });
  }
};

async function getMyOrders(req, res) {
  try {
    // 1. Fetch orders by userId
    const orders = await Order.find({ userId: req.user.id });

    const currentOrders = [];
    const pastOrders = [];

    // 2. Loop through each order and set deliveryDate, state
    for (const order of orders) {
      const createdAt = moment(order.createdAt);
      const deliveryDate = createdAt.add(5, "days"); // deliveryDate is createdAt + 5 days

      // 3. Determine the state based on deliveryDate and isCancelled
      let state = order.state; // Default to the current state of the order

      // If the order is cancelled, set state to 'cancelled'
      if (order.isCancelled) {
        state = "cancelled";
      } else {
        const now = moment();

        // If the deliveryDate has passed and is not cancelled, set state to 'delivered'
        if (now.isAfter(deliveryDate)) {
          state = "delivered";
        }
        // If only 2 days or less remaining to the deliveryDate, set state to 'shipped'
        else if (deliveryDate.diff(now, "days") <= 2) {
          state = "shipped";
        }
        // Otherwise, keep it as 'processing'
        else {
          state = "processing";
        }
      }

      // 4. Update the state (optional if you want to persist the changes)
      await order.updateOne({ state });

      // 5. Add the order to current or past based on its state
      const orderData = { ...order.toObject(), deliveryDate, state };

      if (state === "delivered" || state === "cancelled") {
        pastOrders.push(orderData);
      } else {
        currentOrders.push(orderData);
      }
    }

    // 6. Return the response with current and past orders
    res.json({ currentOrders, pastOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching your orders." });
  }
}

module.exports = {
  getCart,
  editProductInCart,
  removeItemFromCart,
  clearCart,
  checkout,
  getMyOrders,
  CancelOrder,
};
