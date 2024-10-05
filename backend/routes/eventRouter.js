const express = require("express");
const {
  createItinerary,
  createvintage,
  createProduct,
  readAllItineraries,
  readSingleItinerary,
  updateItinerary,
  readAllVintages,
  readSingleVintage,
  updateVintage,
  deleteItinerary,
  deleteVintage,readAllVintage
} = require("../controllers/eventController");
const authController = require("../controllers/authController");
const router = express.Router();

// middleware for authentication
router.use(authController.protect);

// POST a new itinerary, vintage, and product, and create an activity if needed.
router.post(
  "/createItinerary",
  authController.restrictTo("Tour_Guide"),
  createItinerary
);
router.post(
  "/createvintage",
  authController.restrictTo("Tourism_Governer"),
  createvintage
);
router.post(
  "/createProduct",
  authController.restrictTo("Seller", "Admin"),
  createProduct
);
// router.post('/createActivity', createActivity);

router.get(
  "/readAllItineraries",
  authController.restrictTo("Tour_Guide","Advertiser"),
  readAllItineraries
); // itineraries
router.get("/readSingleItinerary/:itineraryId", readSingleItinerary); // itineraries/:id
router.patch(
  "/updateItinerary/:itineraryId",
  authController.restrictTo("Tour_Guide"),
  updateItinerary
); // itineraries/:id
router.delete(
  "/itineraries/:id",
  authController.restrictTo("Tour_Guide", "Admin"),
  deleteItinerary
);

router.get("/readAllVintages", readAllVintages);
router.get("/readAllVintage", readAllVintage);
router.get("/readSingleVintage/:vintageId", readSingleVintage);
router.patch("/updateVintage/:vintageId", updateVintage);
router.delete("/deleteVintage/:id", deleteVintage);

module.exports = router;
