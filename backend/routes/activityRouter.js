const express = require('express');
const activityController = require('../controllers/activityController');
const authController = require('../controllers/authController');



const router = express.Router();



router.get('/', activityController.getActivities);
router.get('/getadvact',[authController.protect ,authController.restrictTo("Advertiser")], activityController.getAdvActivities);

router.get('/getOne/:id', activityController.getActivity);



router.post('/createActivity',[authController.protect ,authController.restrictTo("Advertiser")], activityController.createActivity);

// router.post('/createActivity',[authController.protect ,authController.restrictTo("Advertiser")], activityController.createActivity);
router.patch('/updateActivity/:id',[authController.protect ,authController.restrictTo("Advertiser","Admin")],activityController.updateActivity);


router.delete('/deleteActivity/:id', [authController.protect ,authController.restrictTo("Advertiser")],activityController.deleteActivity);

router.get('/sortActivityByPrice',activityController.sortActivities);

router.get('/shareActivity/:id',activityController.shareActivity);

router.post('/BookActivity/:ActivityId',[authController.protect,authController.restrictTo("Tourist")],activityController.BookActivity);

router.get('/MyBookings',[authController.protect,authController.restrictTo("Tourist")],activityController.MyBookings);

router.get('/CancelBooking/:ActivityId',[authController.protect,authController.restrictTo("Tourist")],activityController.CancelBooking);

module.exports = router;
