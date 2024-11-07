const express = require('express');
const transportationController = require('../controllers/transportationController');
const authController = require('../controllers/authController');



const router = express.Router();



router.get('/',transportationController.getTransportations);
router.get('/getadvTrans',[authController.protect ,authController.restrictTo("Advertiser")], transportationController.getAdvTransportation);

router.get('/getOne/:id', transportationController.getTransportation);



router.post('/createTransportation',[authController.protect ,authController.restrictTo("Advertiser")], transportationController.createTransportation);

// router.post('/createActivity',[authController.protect ,authController.restrictTo("Advertiser")], activityController.createActivity);
router.patch('/updateTransportation/:id',[authController.protect ,authController.restrictTo("Advertiser")],transportationController.updateTransportation);


router.delete('/deleteTransportation/:id', [authController.protect ,authController.restrictTo("Advertiser")],transportationController.deleteTransportation);



module.exports = router;