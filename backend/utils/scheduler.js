const cron = require('node-cron');
const Notification = require('../models/Notifications');
const notificationController = require('../controllers/notificationController');
const Activity = require('../models/Activity');
const Itinerary = require('../models/Itinerary');
const Booking = require('../models/Bookings');

// Helper function to log errors
const logError = (context, error) => {
  console.error(`Error in ${context}:`, error);
};

// Schedule a task to run every minute to check for scheduled notifications
// cron.schedule('*/1 * * * *', async () => {
//   console.log('Running scheduled notification check...');
//   const now = new Date();
//   try {
//     const scheduledNotifications = await Notification.find({
//       scheduledFor: { $lte: now },
//       emailSent: false
//     });
// // Schedule a task to run every minute to check for scheduled notifications
// cron.schedule('*/1 * * * *', async () => {
//   console.log('Running scheduled notification check...');
//   const now = new Date();
//   try {
//     const scheduledNotifications = await Notification.find({
//       scheduledFor: { $lte: now },
//       emailSent: false
//     });

//     console.log(`Found ${scheduledNotifications.length} notifications to send.`);

//     for (const notification of scheduledNotifications) {
//       try {
//         await notificationController.sendEmail(notification);
//         console.log(`Sent notification: ${notification._id}`);
//       } catch (error) {
//         logError('sending email', error);
//       }
//     }
//   } catch (error) {
//     logError('scheduled notification check', error);
//   }
// });

// Schedule a task to run daily at midnight to check for tomorrow's events
cron.schedule('0 0 * * *', async () => {
  console.log('Running check for tomorrow\'s events...');
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

  try {
    const upcomingActivities = await Activity.find({
      start_date: {
        $gte: tomorrow,
        $lt: dayAfterTomorrow
      }
    });

    console.log(`Found ${upcomingActivities.length} activities for tomorrow.`);

    for (const activity of upcomingActivities) {
      try {
        const bookings = await Booking.find({ ActivityId: activity._id });
        console.log(`Found ${bookings.length} bookings for activity ${activity._id}`);
        for (const booking of bookings) {
          await notificationController.scheduleUpcomingEventReminder(booking.UserId, activity._id, "Activity");
          console.log(`Scheduled reminder for user ${booking.UserId} for activity ${activity._id}`);
        }
      } catch (error) {
        logError(`processing activity ${activity._id}`, error);
      }
    }

    const upcomingItineraries = await Itinerary.find({
      start_date: {
        $gte: tomorrow,
        $lt: dayAfterTomorrow
      }
    });

    console.log(`Found ${upcomingItineraries.length} itineraries for tomorrow.`);

    for (const itinerary of upcomingItineraries) {
      try {
        const bookings = await Booking.find({ ItineraryId: itinerary._id });
        console.log(`Found ${bookings.length} bookings for itinerary ${itinerary._id}`);
        for (const booking of bookings) {
          await notificationController.scheduleUpcomingEventReminder(booking.UserId, itinerary._id, "Itinerary");
          console.log(`Scheduled reminder for user ${booking.UserId} for itinerary ${itinerary._id}`);
        }
      } catch (error) {
        logError(`processing itinerary ${itinerary._id}`, error);
      }
    }
  } catch (error) {
    logError('checking tomorrow\'s events', error);
  }
});

// Ensure the cron job is running
console.log('Scheduler initialized. Cron jobs are set up.');