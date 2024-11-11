const express = require('express');
const amadusController = require('../controllers/amadusController');
const authController = require('../controllers/authController');
const router = express.Router();
router.get('/getFlights',amadusController.getFlights);
router.get('/cities',amadusController.cities);
router.get('/hotels',amadusController.getHotels);
router.get('/hotelDetails',amadusController.getHotelDetails);
router.get('/seatMap',amadusController.getSeatmap);

router.post('/BookHotel',[authController.protect,authController.restrictTo("Tourist")],amadusController.BookHotel);
router.post('/BookFlight',[authController.protect,authController.restrictTo("Tourist")],amadusController.BookFlight);
router.get('/MyhBookings',[authController.protect,authController.restrictTo("Tourist")],amadusController.MyHotelBookings);
router.get('/MyfBookings',[authController.protect,authController.restrictTo("Tourist")],amadusController.MyFlightBookings);

router.patch('/CancelhBooking',[authController.protect,authController.restrictTo("Tourist")],amadusController.CancelhotelBooking);
router.patch('/CancelfBooking',[authController.protect,authController.restrictTo("Tourist")],amadusController.CancelflightBooking);
module.exports = router;
