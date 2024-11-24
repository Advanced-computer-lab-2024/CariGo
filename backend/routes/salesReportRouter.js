const express = require('express');
const salesReportController = require('../controllers/salesReportController');
const authController = require('../controllers/authController');



const router = express.Router();




router.get('/',[authController.protect ,authController.restrictTo("Advertiser")], salesReportController.generateSalesReport);






module.exports = router;