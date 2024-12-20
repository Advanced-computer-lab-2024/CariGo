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
  MyItineraryBookings,
  CancelItineraryBooking,
  currencyConversion,
  suggestedItineraries,
  suggestedActivities,
  create_payment_form,

  redeemPromoCode,
  cancelPromoCode,

  openBookings

} = require("../controllers/eventController");
const authController = require("../controllers/authController");
const { readItinerariesByIds } = require("../controllers/eventController");

const router = express.Router();

router.get("/currencyConversion",currencyConversion);

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

router.get("/suggested", suggestedItineraries);
router.get("/suggestedActivities", suggestedActivities);
// router.post('/createActivity', createActivity);
router.get("/viewAllVintage", authController.protect, viewAllVintage);

router.patch(
  "/updateItinerary/:itineraryId",
  authController.restrictTo("Tour_Guide", "Admin", "Tourist"),
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
router.post(
  "/openBookings/:id",
  authController.restrictTo("Tour_Guide"),
  openBookings
);
router.get(
  "/MyItineraryBookings",
  authController.restrictTo("Tourist"),
  MyItineraryBookings
);

router.patch(
  "/CancelItineraryBooking",
  authController.restrictTo("Tourist"),
  CancelItineraryBooking
);

router.post(
  "/redeemPromoCode",
  authController.restrictTo("Tourist"),
  redeemPromoCode
);

router.post(
  "/cancelPromoCode",
  authController.restrictTo("Tourist"),
  cancelPromoCode
);

router.post(
  "/create_payment_form",
  authController.restrictTo("Tourist"),
  create_payment_form
);

router.get("/readItinerariesByIds", readItinerariesByIds);


module.exports = router;
