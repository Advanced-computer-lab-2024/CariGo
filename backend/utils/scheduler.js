const cron = require('node-cron');
const Notification = require('../models/Notification');
const notificationController = require('../controllers/notificationController');
const Activity = require('../models/Activity');
const Itinerary = require('../models/Itinerary');
const Booking = require('../models/Booking');

// Schedule a task to run every minute to check for scheduled notifications
cron.schedule('* * * * *', async () => {
  const now = new Date();
  const scheduledNotifications = await Notification.find({
    scheduledFor: { $lte: now },
    emailSent: false
  });

  for (const notification of scheduledNotifications) {
    await notificationController.sendEmail(notification);
  }
});

// Schedule a task to run daily to check for upcoming events
cron.schedule('0 0 * * *', async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const upcomingActivities = await Activity.find({
    startDate: {
      $gte: tomorrow,
      $lt: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)
    }
  });

  for (const activity of upcomingActivities) {
    const bookings = await Booking.find({ ActivityId: activity._id });
    for (const booking of bookings) {
      await notificationController.scheduleUpcomingEventReminder(booking.UserId, activity._id, "Activity");
    }
  }

  const upcomingItineraries = await Itinerary.find({
    startDate: {
      $gte: tomorrow,
      $lt: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)
    }
  });

  for (const itinerary of upcomingItineraries) {
    const bookings = await Booking.find({ ItineraryId: itinerary._id });
    for (const booking of bookings) {
      await notificationController.scheduleUpcomingEventReminder(booking.UserId, itinerary._id, "Itinerary");
    }
  }
});