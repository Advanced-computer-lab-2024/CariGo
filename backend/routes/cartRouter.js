const express = require('express');
const { getCart, editProductInCart, removeItemFromCart, clearCart } = require('../controllers/cartController');
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

// Get user's cart
router.get('/', getCart);

// Edit product quantity in cart (add/update)
router.patch('/edit', editProductInCart);

// Remove item from cart
router.patch('/remove/:id', removeItemFromCart);

// clear cart
router.patch('/clear', clearCart);

module.exports = router;