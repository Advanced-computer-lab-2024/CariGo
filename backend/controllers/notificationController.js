const nodemailer = require("nodemailer");
const Notification = require("../models/Notifications");
const User = require("../models/User");
const Activity = require("../models/Activity");
const Itinerary = require("../models/Itinerary");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.sendNotification = async (
  userId,
  message,
  type,
  contentId,
  contentModel,
  scheduledFor = null
) => {
  const notification = await Notification.create({
    userId,
    message,
    type,
    contentId,
    contentModel,
    scheduledFor,
  });
  console.log("Notification sent:", notification.userId);
  if (["flagged_content", "upcoming_event", "out_of_stock", "booking_opened"].includes(type)) {
    await sendEmail(notification);
  }

  console.log("Notification sent:", notification);
  
};

const sendEmail = async (notification) => {
  try {
    console.log(notification)
    const user = await User.findById(notification.userId);
    if (!user || !user.email) {
      throw new Error("User email not found");
    }
    console.log(user)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: '"CariGo 🦌" <Carigo@test.email>',
      to: user.email,
      subject: `Notification: ${notification.type}`,
      text: notification.message,
    });

    notification.emailSent = true;
    await notification.save();

    console.log("Email sent for notification:", notification);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

exports.getUnreadNotifications = catchAsync(async (req, res, next) => {
  const notifications = await Notification.find({ userId: req.user._id, isRead: false }).sort("-createdAt");
  res.status(200).json({
    status: 'success',
    data: {
      notifications
    }
  });
});

exports.getAllNotifications = catchAsync(async (req, res, next) => {
  console.log('getAllNotifications');
  const notifications = await Notification.find({ userId: req.user._id }).sort("-createdAt");
  res.status(200).json({
    status: 'success',
    data: {
      notifications
    }
  });
});

exports.getNotification = catchAsync(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    return next(new AppError('No notification found with that ID', 404));
  }
  if (notification.userId.toString() !== req.user._id.toString()) {
    return next(new AppError('You do not have permission to view this notification', 403));
  }
  res.status(200).json({
    status: 'success',
    data: {
      notification
    }
  });
});

exports.deleteNotification = catchAsync(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    return next(new AppError('No notification found with that ID', 404));
  }
  if (notification.userId.toString() !== req.user._id.toString()) {
    return next(new AppError('You do not have permission to delete this notification', 403));
  }
  await Notification.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.markAllAsRead = catchAsync(async (req, res, next) => {
  await Notification.updateMany({ userId: req.user._id }, { isRead: true });
  res.status(200).json({
    status: 'success',
    message: 'All notifications marked as read'
  });
});

exports.markAsRead = catchAsync(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    return next(new AppError('No notification found with that ID', 404));
  }
  if (notification.userId.toString() !== req.user._id.toString()) {
    return next(new AppError('You do not have permission to modify this notification', 403));
  }
  notification.isRead = true;
  await notification.save();
  res.status(200).json({
    status: 'success',
    data: {
      notification
    }
  });
});

exports.scheduleNotification = async (
  userId,
  message,
  type,
  contentId,
  contentModel,
  scheduledFor
) => {
  await this.sendNotification(
    userId,
    message,
    type,
    contentId,
    contentModel,
    scheduledFor
  );
};

exports.sendFlaggedContentNotification = async (
  userId,
  contentId,
  contentModel,
  title
) => {

  console.log("sendFlaggedContentNotification in");
  const message = `Your ${contentModel.toLowerCase()} ${title} has been flagged as inappropriate by the admin.`;
  await this.sendNotification(
    userId,
    message,
    "flagged_content",
    contentId,
    contentModel
  );
};

exports.sendBookingOpenedNotification = async (eventId, eventType) => {
  let event;
  if (eventType === "Activity"){
    event = await Activity.findById(eventId).populate('interestedUsers');
  }
  if (eventType === "Itinerary"){
    event = await Itinerary.findById(eventId).populate('interestedUsers');
  }
  if (event && event.interestedUsers.length > 0) {
    const message = `Bookings are now open for the ${eventType.toLowerCase()}: ${event.title}`;
    for (const user of event.interestedUsers) {
      await this.sendNotification(user._id, message, 'booking_opened', eventId, eventType);

    }
  }
};

exports.scheduleUpcomingEventReminder = async (userId, eventId, eventType) => {
  let event;
  if (eventType === "Activity") {
    event = await Activity.findById(eventId);
  } else if (eventType === "Itinerary") {
    event = await Itinerary.findById(eventId);
  }

  console.log("here");

  if (event) {
    const reminderDate = new Date(event.start_date);
    reminderDate.setDate(reminderDate.getDate() - 1);
    const message = `Reminder: You have an upcoming ${eventType.toLowerCase()} "${event.title}" tomorrow.`;
    await this.scheduleNotification(userId, message, 'upcoming_event', eventId, eventType, reminderDate);
  }
};

exports.sendOutOfStockNotification = async (productId) => {
  const product = await Product.findById(productId);
  if (product) {
    console.log("sendOutOfStockNotification in");
    const message = `The product "${product.name}" is now out of stock.`;
      await this.sendNotification(
        product.author,
        message,
        "out_of_stock",
        productId,
        "Product"
      );

  }
};

exports.checkProductStock = async (productId) => {
  const product = await Product.findById(productId);
  if (product && product.quantity === 0) {
    await this.sendOutOfStockNotification(productId);
  }
};