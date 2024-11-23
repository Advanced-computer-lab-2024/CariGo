const { getChannel } = require("./rabbitmq-connection");
const nodemailer = require("nodemailer");
const Notification = require("../models/Notification");
const User = require("../models/User");

const QUEUE_NAME = "notifications";

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const notificationService = {
  async sendNotification(
    userId,
    message,
    type,
    contentId = null,
    contentModel = null,
    scheduledFor = null
  ) {
    const channel = await getChannel();
    await channel.assertQueue(QUEUE_NAME);

    const notification = {
      userId,
      message,
      type,
      contentId,
      contentModel,
      scheduledFor,
      timestamp: new Date(),
    };

    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(notification)));
    console.log("Notification sent to queue:", notification);
  },

  async processNotifications() {
    try {
      const channel = await getChannel();
      if (!channel) {
        console.log("RabbitMQ channel not available, retrying in 5 seconds...");
        setTimeout(() => this.processNotifications(), 5000);
        return;
      }

      await channel.assertQueue(QUEUE_NAME);

      channel.consume(QUEUE_NAME, async (msg) => {
        if (msg !== null) {
          const notification = JSON.parse(msg.content.toString());
          await this.handleNotification(notification);
          channel.ack(msg);
        }
      });

      console.log("Notification processor started");
    } catch (error) {
      console.error("Error processing notifications:", error);
      setTimeout(() => this.processNotifications(), 5000);
    }
  },

  async handleNotification(notificationData) {
    const notification = new Notification(notificationData);
    await notification.save();

    if (
      ["flagged_content", "upcoming_event", "out_of_stock"].includes(
        notification.type
      )
    ) {
      await this.sendEmail(notification);
    }

    console.log("Processed notification:", notification);
  },

  async sendEmail(notification) {
    try {
      const user = await User.findById(notification.userId);
      if (!user || !user.email) {
        throw new Error("User email not found");
      }

      await transporter.sendMail({
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
  },

  async getUnreadNotifications(userId) {
    return await Notification.find({ userId, isRead: false }).sort(
      "-createdAt"
    );
  },

  async markAsRead(notificationId) {
    const notification = await Notification.findById(notificationId);
    if (notification) {
      notification.isRead = true;
      await notification.save();
    }
  },

  async scheduleNotification(
    userId,
    message,
    type,
    contentId,
    contentModel,
    scheduledFor
  ) {
    await this.sendNotification(
      userId,
      message,
      type,
      contentId,
      contentModel,
      scheduledFor
    );
  },
};

// Export the notificationService object
module.exports = notificationService;
