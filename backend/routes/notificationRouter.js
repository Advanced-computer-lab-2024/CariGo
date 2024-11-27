const express = require('express');
const notificationController = require('../controllers/notificationController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.get('/unread', notificationController.getUnreadNotifications);
router.get('/', notificationController.getAllNotifications);
router.get('/:id', notificationController.getNotification);
router.delete('/:id', notificationController.deleteNotification);
router.patch('/mark-all-read', notificationController.markAllAsRead);
router.patch('/:id/mark-read', notificationController.markAsRead);

module.exports = router;