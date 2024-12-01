const express = require("express");
const {
  getCart,
  editProductInCart,
  removeItemFromCart,
  clearCart,
  checkout,
  getMyOrders,
  CancelOrder,
} = require("../controllers/cartController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

// Get user's cart
router.get("/", getCart);

// Edit product quantity in cart (add/update)
router.patch("/edit", editProductInCart);

// Remove item from cart
router.patch("/remove/:id", removeItemFromCart);

// clear cart
router.patch("/clear", clearCart);
router.get('/MyOrders',authController.restrictTo("Tourist"),getMyOrders);
router.patch('/cancel',authController.restrictTo("Tourist"),CancelOrder);
// Checkout
router.post("/checkout", checkout);

module.exports = router;
