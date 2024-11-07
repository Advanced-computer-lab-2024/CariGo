const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const {
  getAllPurchases,
  getUserPurchases,
  getProductPurchases,
  makePurchase,
} = require("../controllers/purchaseController");

router.get("/productPurchases/:id", getProductPurchases);

// middleware for authentication
router.use(authController.protect);
router.get("/purchases", getAllPurchases);
router.get("/userPurchases", getUserPurchases);
router.post("/makePurchase", makePurchase);
module.exports = router;
