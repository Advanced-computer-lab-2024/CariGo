const mongoose = require("mongoose");
const dotenv = require("dotenv");
const notification = require("./utils/notification");
const { connectRabbitMQ } = require("./utils/rabbitmq-connection.js");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!! 💥 shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./.env" });

const app = require("./app");

const cors = require("cors");

// Apply CORS middleware
// app.use(cors);

// const DB = process.env.DATABASE;

const uri = process.env.DATABASE;

// Connect to RabbitMQ and start the server
async function startServer() {
  try {
    await connectRabbitMQ();
    console.log("Connected to RabbitMQ");

    await notification.processNotifications();
    console.log("Notification processor started");

    mongoose
      .connect(uri)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.log("MongoDB connection error:", err));

    const port = process.env.PORT || 4000;
    const server = app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!! 💥 shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
