const express = require('express');
const amadusController = require('../controllers/amadusController');

const router = express.Router();
router.get('/getFlights',amadusController.getFlights);
router.get('/cities',amadusController.cities);
router.get('/hotels',amadusController.getHotels);
router.get('/hotelDetails',amadusController.getHotelDetails);
router.get('/seatMap',amadusController.getSeatmap);
module.exports = router;