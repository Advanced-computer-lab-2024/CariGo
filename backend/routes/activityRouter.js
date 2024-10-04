const express = require('express');
const activityController = require('../controllers/activityController');
const authController = require('../controllers/authController');



const router = express.Router();



router.get('/', activityController.getActivities);

router.get('/getOne/:id', activityController.getActivity);

router.post('/createActivity',[authController.protect ,authController.restrictTo("Advertiser")], activityController.createActivity);

router.patch('/updateActivity/:id',activityController.updateActivity);

router.delete('/deleteActivity/:id', activityController.deleteActivity);

router.get('/sortActivityByPrice',activityController.sortActivities);




module.exports = router;