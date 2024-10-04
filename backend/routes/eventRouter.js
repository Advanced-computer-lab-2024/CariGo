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
  deleteVintage
} = require("../controllers/eventController");

const router = express.Router();

router.post("/createItinerary", createItinerary);
router.post("/createvintage", createvintage);
router.post("/createProduct", createProduct);
// router.post('/createActivity', createActivity);

router.get("/readAllItineraries", readAllItineraries); // itineraries
router.get("/readSingleItinerary/:itineraryId", readSingleItinerary); // itineraries/:id
router.patch("/updateItinerary/:itineraryId", updateItinerary); // itineraries/:id
router.delete("/itineraries/:id", deleteItinerary);

router.get("/readAllVintages", readAllVintages);
router.get("/readSingleVintage/:vintageId", readSingleVintage);
router.patch("/updateVintage/:vintageId", updateVintage);
router.delete("/deleteVintage/:id", deleteVintage);

module.exports = router;
