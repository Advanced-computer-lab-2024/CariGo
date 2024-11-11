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
    const entityId = req.params.id;

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

  const isBookingFinished = (booking) => {
    return booking.end_date <= Date.now();
  };

  if (req.body.activity) {
    const activityId = req.body.activity;
    const booking = await Booking.find({
      UserId: userId,
      ActivityId: activityId,
      Status: true,
    });
    console.log(booking);

    if (booking.length == 0) {
      return next(
        new AppError(
          `You cannot review this activity because you have not booked and completed it.`,
          400
        )
      );
    }
  } else if (req.body.itinerary) {
    const itineraryId = req.body.itinerary;
    const booking = await Booking.find({
      UserId: userId,
      ItineraryId: itineraryId,
      Status: true,
    });
    if (booking.length == 0) {
      return next(
        new AppError(
          `You cannot review this itinerary because you have not booked and completed it.`,
          400
        )
      );
    }
  } else if (req.body.tourGuide) {
    const tourGuideId = req.body.tourGuide;
    // console.log(tourGuideId,"ana hena");
    const booking = await Booking.find({
      UserId: userId,
      Status: true,
    }).populate({
      path: "ItineraryId",
      match: { author: tourGuideId },
    });
    console.log(tourGuideId, "ana hena");
    console.log(booking);
    // console.log(booking)
    if (booking.length == 0) {
      return next(
        new AppError(
          `You cannot review this tour guide because you have not completed a tour with him.`,
          400
        )
      );
    }

    // Check if at least one booking is finished
    // if (!booking.some(isBookingFinished)) {
    //   return next(
    //     new AppError(
    //       You cannot review this tour guide because you have not completed a tour with him.,
    //       400
    //     )
    //   );
    // }
  }

  const doc = await Review.create(req.body);
  res.status(201).json({ status: "success", data: { data: doc } });
});

exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
