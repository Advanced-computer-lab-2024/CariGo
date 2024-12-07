const express = require('express');
const salesReportController = require('../controllers/salesReportController');
const authController = require('../controllers/authController');



const router = express.Router();




router.get('/',[authController.protect ,authController.restrictTo("Advertiser","Tour_Guide","Seller")], salesReportController.generateSalesReport);
router.get('/I',[authController.protect ,authController.restrictTo("Tour_Guide")], salesReportController.generateSalesReportForItinerary);





module.exports = router;