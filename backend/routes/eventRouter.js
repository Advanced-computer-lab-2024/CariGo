const express = require("express");
const {     
  createItinerary,
  createvintage,
  createProduct,
  createActivity,
  readAllItineraries,
  readSingleItinerary,
  updateItinerary,
  readAllVintages,
  readSingleVintage,
  updateVintage,
  readActivities
} = require("../controllers/eventController");

const router = express.Router();

router.post('/createItinerary', createItinerary);
router.post('/createvintage', createvintage);
router.post('/createProduct', createProduct);
router.post('/createActivity', createActivity);

router.get('/readAllItineraries', readAllItineraries);
router.get('/readSingleItinerary/:itineraryId', readSingleItinerary);
router.patch('/updateItinerary/:itineraryId', updateItinerary);

router.get('/readAllVintages', readAllVintages);
router.get('/readSingleVintage/:vintageId', readSingleVintage);
router.patch('/updateVintage/:vintageId', updateVintage);

router.get('/readActivities', readActivities);
module.exports = router;