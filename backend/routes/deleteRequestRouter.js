const express = require('express');
const DeleteRequestController = require('../controllers/deleteRequestController');
const authController = require('../controllers/authController');



const router = express.Router();







router.post('/createReq',[authController.protect ,authController.restrictTo("Advertiser","Seller","Tour_Guide","Tourist")], DeleteRequestController.createDeleteRequest);
router.get('/getReq', DeleteRequestController.getAllRequests);
router.delete('/delReq', DeleteRequestController.deleteRequest);
module.exports = router;
