const express = require('express');
const transportationController = require('../controllers/transportationController');
const authController = require('../controllers/authController');



const router = express.Router();



router.get('/',transportationController.getTransportations);
router.get('/getadvTrans',[authController.protect ,authController.restrictTo("Advertiser")], transportationController.getAdvTransportation);

router.get('/getOne/:id', transportationController.getTransportation);

router.post('/BookTransportation/:TransportationId',[authController.protect,authController.restrictTo("Tourist")],transportationController.BookTransportation);

router.post('/createTransportation',[authController.protect ,authController.restrictTo("Advertiser")], transportationController.createTransportation);

// router.post('/createActivity',[authController.protect ,authController.restrictTo("Advertiser")], activityController.createActivity);
router.patch('/updateTransportation/:id',[authController.protect ,authController.restrictTo("Advertiser")],transportationController.updateTransportation);


router.delete('/deleteTransportation/:id', [authController.protect ,authController.restrictTo("Advertiser")],transportationController.deleteTransportation);

router.get('/MyBookings',[authController.protect,authController.restrictTo("Tourist")],transportationController.MyTransportationBookings);
router.patch('/CancelBooking/:bookId',[authController.protect,authController.restrictTo("Tourist")],transportationController.CancelBooking);
module.exports = router;