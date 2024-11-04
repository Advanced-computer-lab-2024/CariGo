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
  readMyItineraries,
  viewAllVintage,
  updateVintage,
  deleteItinerary,
  deleteVintage,
  readAllVintage,
  shareItinerary,
  shareVintage,
  BookItinerary,
} = require("../controllers/eventController");
const authController = require("../controllers/authController");
const router = express.Router();


router.get(
  "/readAllItineraries",
  readAllItineraries
); // itineraries

router.get("/readSingleItinerary/:itineraryId", readSingleItinerary); // itineraries/:id
router.get("/readSingleVintage/:vintageId", readSingleVintage);
router.get("/readAllVintage", readAllVintage);
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

router.get(
  "/readMyItineraries",
  authController.restrictTo("Tour_Guide"),
  readMyItineraries
); // itineraries

// router.post('/createActivity', createActivity);
router.get(
  "/viewAllVintage",
  authController.protect,
  viewAllVintage
);

router.patch(
  "/updateItinerary/:itineraryId",
  authController.restrictTo("Tour_Guide", "Admin"),
  updateItinerary
); // itineraries/:id
router.delete(
  "/itineraries/:id",
  authController.restrictTo("Tour_Guide", "Admin"),
  deleteItinerary
);

router.get("/readAllVintages", readAllVintages);
router.patch("/updateVintage/:vintageId", updateVintage);
router.delete("/deleteVintage/:id", deleteVintage);

router.get("/shareItinerary/:id", shareItinerary);
router.get("/shareVintage/:id", shareVintage);

router.post(
  "/BookItinerary/:ItineraryId",
  authController.restrictTo("Tourist"),
  BookItinerary
);

module.exports = router;