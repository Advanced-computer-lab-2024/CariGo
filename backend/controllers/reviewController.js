 const catchAsync = require('./../utils/catchAsync');
const Review = require("./../models/reviewModel");
const factory = require("./handlerFactory");

exports.setProductUserIds = (req, res, next) => {
  // Allow Nested routes
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.setActivityUserIds = (req, res, next) => {
  // Allow Nested routes
  if (!req.body.activity) req.body.activity = req.params.activityId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllProductReviews = catchAsync(async (req, res, next) => {
    const productId = req.params.productId;
  
    if (!productId) {
      return next(new AppError('Please provide a valid product ID. 🛒', 400));
    }
  
    const reviews = await Review.find({ product: productId });
  
    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: {
        reviews
      }
    });
  });
  
  exports.getAllActivityReviews = catchAsync(async (req, res, next) => {
    const activityId = req.params.activityId;
  
    if (!activityId) {
      return next(new AppError('Please provide a valid activity ID. 🤸🏼‍♂️', 400));
    }
  
    const reviews = await Review.find({ activity: activityId });
  
    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: {
        reviews
      }
    });
  });
  

exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
