const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const {
  getAllPurchases,
  getUserPurchases,
  getProductPurchases,
  makePurchase,
} = require("../controllers/purchaseController");

// middleware for authentication
router.use(authController.protect);
router.get("/purchases", getAllPurchases);
router.get("/userPurchases", getUserPurchases);
router.get("/productPurchases/:id", getProductPurchases);
router.post("/makePurchase", makePurchase);
module.exports = router;
