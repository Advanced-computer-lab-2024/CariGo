const express = require("express");
const bodyParser = require("body-parser");
const AppError = require("./utils/appError");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const userRouter = require("./routes/userRouter.js");
const advertiserRouter = require("./routes/avertiserRouter.js");
const activityRouter = require("./routes/activityRouter.js");
const eventRouter = require("./routes/eventRouter.js");
const app = express();
// LIMIT REQUESTS FROM SAME API
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again in an hour!⌚",
});
app.use("/cariGo", limiter);
// BODY PARSER, reading data from body into req.body
app.use(bodyParser.raw({ type: "application/octet-stream", limit: "10mb" }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// DATA SANITIZATION AGAINST NOSQL QUERY INJECTION
app.use(mongoSanitize());
// DATA SANITIZATION AGAINST XSS
app.use(xss());

/////////////////////// ROUTES /////////////////////////

app.use("/cariGo/users", userRouter);
app.use("/cariGo/advertiser", advertiserRouter);
app.use("/cariGo/activity", activityRouter);
app.use("/Event", eventRouter)

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
