const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");
const mongoose = require("mongoose");

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate(
      "products.productId",
      "name price ratingsAverage mainImage"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const createCart = async (req, res) => {
//     try {
//         const userId = req.body.userId;
//         const cart = await Cart.create({ userId, products: [] });
//         res.status(201).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

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
    const productId  = req.params.id;

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
    const cart = await Cart.findOne({ userId });  // Find the user's cart
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.products = []; // Clear the cart
    await cart.save(); // Save the updated cart
    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getCart, editProductInCart, removeItemFromCart, clearCart };