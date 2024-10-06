const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!! 💥 shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./.env" });

const app = require("./app");

const cors = require('cors');



const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  // AccessControlAllowMethods :['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  // preflightContinue: true,
  onSuccess: (req, res) => {
    console.log('CORS request successful');
},
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));


// const DB = process.env.DATABASE;

const uri = process.env.DATABASE;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
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
