const express = require('express');
const activityController = require('../controllers/activityController');
const authController = require('../controllers/authController');
const { getActivitiesByIds } = require("../controllers/activityController"); 



const router = express.Router();



router.get("/readActivitiesByIds", getActivitiesByIds);

router.get('/', activityController.getActivities);
router.get('/adminActivities', activityController.getActivitiesForAdmin);
router.get('/getadvact',[authController.protect ,authController.restrictTo("Advertiser")], activityController.getAdvActivities);

router.get('/getOne/:id', activityController.getActivity);



router.post('/createActivity',[authController.protect ,authController.restrictTo("Advertiser")], activityController.createActivity);

// router.post('/createActivity',[authController.protect ,authController.restrictTo("Advertiser")], activityController.createActivity);
router.patch('/updateActivity/:id',[authController.protect ,authController.restrictTo("Advertiser","Admin")],activityController.updateActivity);


router.delete('/deleteActivity/:id', [authController.protect ,authController.restrictTo("Advertiser")],activityController.deleteActivity);

router.get('/sortActivityByPrice',activityController.sortActivities);

router.get('/shareActivity/:id',activityController.shareActivity);

router.post('/BookActivity/:ActivityId',[authController.protect,authController.restrictTo("Tourist")],activityController.BookActivity);

router.get('/MyActivityBookings',[authController.protect,authController.restrictTo("Tourist")],activityController.MyActivityBookings);

router.patch('/CancelActivityBooking',[authController.protect,authController.restrictTo("Tourist")],activityController.CancelActivityBooking);

module.exports = router;
