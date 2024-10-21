 const catchAsync = require('./../utils/catchAsync');
const Review = require("./../models/reviewModel");
const factory = require("./handlerFactory");
const AppError = require('./../utils/appError');

// Generic Middleware to set entity and user IDs
exports.setEntityUserIds = (entityName) => (req, res, next) => {
  if (!req.body[entityName]) req.body[entityName] = req.params[`${entityName}Id`];
  if (!req.body.user) req.body.user = req.user.id;
  next();
};


// Generic Handler to get all reviews for any entity
exports.getAllReviewsForEntity = (entityName) =>
  catchAsync(async (req, res, next) => {
    const entityId = req.params[`${entityName}Id`];

    if (!entityId) {
      return next(new AppError(`Please provide a valid ${entityName} ID.`, 400));
    }

    const reviews = await Review.find({ [entityName]: entityId });

    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: {
        reviews,
      },
    });
  });

// Set User and Entity ID middleware
exports.setProductUserIds = exports.setEntityUserIds('product');
exports.setActivityUserIds = exports.setEntityUserIds('activity');
exports.setItineraryUserIds = exports.setEntityUserIds('itinerary');
exports.setTourGuideUserIds = exports.setEntityUserIds('tourGuide');

// Get All Reviews Handlers
exports.getAllProductReviews = exports.getAllReviewsForEntity('product');
exports.getAllActivityReviews = exports.getAllReviewsForEntity('activity');
exports.getAllItineraryReviews = exports.getAllReviewsForEntity('itinerary');
exports.getAllTourGuideReviews = exports.getAllReviewsForEntity('tourGuide');

// CRUD operations using factory handlers
exports.getReview = factory.getOne(Review);

exports.createReview = catchAsync(async (req, res, next) => { 
  // if(req.body.product){
    
  // }
  // else if(req.body.activity){

  // }
  // else if(req.body.itinerary){

  // }
  // else (req.body.tourGuide){

  // }
  const doc = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    } 
  });

});
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
