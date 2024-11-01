const express = require('express');
const amadusController = require('../controllers/amadusController');

const router = express.Router();
router.get('/getFlights',amadusController.getFlights);
router.get('/cities',amadusController.cities);
router.get('/hotels',amadusController.getHotels);
module.exports = router;