const mongoose = require("mongoose");
const dotenv = require("dotenv");
const scheduler = require('./utils/scheduler');


process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!! 💥 shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./.env" });

const app = require("./app");

const cors = require('cors');


// Apply CORS middleware
// app.use(cors);



// const DB = process.env.DATABASE;

const uri = process.env.DATABASE;

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected");
    // Start the scheduler after the database connection is established
    scheduler;
  })
  .catch((err) => console.log("MongoDB connection error:", err));

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!! 💥 shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
