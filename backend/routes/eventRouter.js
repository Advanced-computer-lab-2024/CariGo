const express = require("express");
const { createItinerary,
  createvintage,
    createProduct,
    createActivity
} = require("../controllers/eventController");

const router = express.Router();

router.post('/createItinerary', createItinerary);
router.post('/createvintage', createvintage);
router.post('/createProduct', createProduct);
router.post('/createActivity', createActivity);
module.exports = router;