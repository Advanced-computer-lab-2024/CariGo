const express = require('express');
const activityController = require('../controllers/activityController');
const authController = require('../controllers/authController');



const router = express.Router();



router.get('/', activityController.getActivities);
router.get('/getadvact',[authController.protect ,authController.restrictTo("Advertiser")], activityController.getAdvActivities);

router.get('/getOne/:id',authController.restrictTo("Advertiser"), activityController.getActivity);



router.post('/createActivity',[authController.protect ,authController.restrictTo("Advertiser")], activityController.createActivity);

// router.post('/createActivity',[authController.protect ,authController.restrictTo("Advertiser")], activityController.createActivity);
router.patch('/updateActivity/:id',[authController.protect ,authController.restrictTo("Advertiser")],activityController.updateActivity);


router.delete('/deleteActivity/:id', [authController.protect ,authController.restrictTo("Advertiser")],activityController.deleteActivity);

router.get('/sortActivityByPrice',activityController.sortActivities);




module.exports = router;