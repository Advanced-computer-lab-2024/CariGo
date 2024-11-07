const catchAsync = require("./../utils/catchAsync");
const Review = require("./../models/reviewModel");
const Booking = require("./../models/Bookings");
const factory = require("./handlerFactory");
const AppError = require("./../utils/appError");

// Generic Middleware to set entity and user IDs
exports.setEntityUserIds = (entityName) => (req, res, next) => {
  if (!req.body[entityName])
    req.body[entityName] = req.params[`${entityName}Id`];
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// Generic Handler to get all reviews for any entity
exports.getAllReviewsForEntity = (entityName) =>
  catchAsync(async (req, res, next) => {
    const entityId = req.params[`${entityName}Id`];

    if (!entityId) {
      return next(
        new AppError(`Please provide a valid ${entityName} ID.`, 400)
      );
    }

    const reviews = await Review.find({ [entityName]: entityId });

    res.status(200).json({
      status: "success",
      results: reviews.length,
      data: {
        reviews,
      },
    });
  });

// Set User and Entity ID middleware
exports.setProductUserIds = exports.setEntityUserIds("product");
exports.setActivityUserIds = exports.setEntityUserIds("activity");
exports.setItineraryUserIds = exports.setEntityUserIds("itinerary");
exports.setTourGuideUserIds = exports.setEntityUserIds("tourGuide");

// Get All Reviews Handlers
exports.getAllProductReviews = exports.getAllReviewsForEntity("product");
exports.getAllActivityReviews = exports.getAllReviewsForEntity("activity");
exports.getAllItineraryReviews = exports.getAllReviewsForEntity("itinerary");
exports.getAllTourGuideReviews = exports.getAllReviewsForEntity("tourGuide");

// CRUD operations using factory handlers
exports.getReview = factory.getOne(Review);

exports.createReview = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  let booking;

  if (req.body.activity) {
    const activityId = req.body.activity;
    console.log("Checking activity booking:", { userId, activityId });
    booking = await Booking.findOne({
      UserId: userId,
      ActivityId: activityId,
      Status: true,
    });
    if (!booking) {
      return next(
        new AppError(
          `You cannot review this activity because you have not completed it.`,
          400
        )
      );
    }
  } else if (req.body.itinerary) {
    const itineraryId = req.body.itinerary;
    console.log("Checking itinerary booking:", { userId, itineraryId });
    booking = await Booking.findOne({
      UserId: userId,
      ItineraryId: itineraryId,
      Status: true,
    });
    if (!booking) {
      return next(
        new AppError(
          `You cannot review this itinerary because you have not completed it.`,
          400
        )
      );
    }
  } else if (req.body.tourGuide) {
    const tourGuideId = req.body.tourGuide;
    // console.log("Checking tour guide booking:", { userId, tourGuideId });
    // console.log(`userId: ${userId}, tourGuideId: ${tourGuideId}`);
    booking = await Booking.find({
      UserId: userId,
      "ItineraryId.author": tourGuideId,
      Status: true,
    });
    if (!booking) {
      return next(
        new AppError(
          `You cannot review this tour guide because you have not completed a tour with him.`,
          400
        )
      );
    }
  }

  const doc = await Review.create(req.body);
  res.status(201).json({ status: "success", data: { data: doc } });
});

exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
