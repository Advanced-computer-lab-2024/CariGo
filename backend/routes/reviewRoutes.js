const express = require("express");
const catchAsync = require('../utils/catchAsync')
const reviewController = require("./../controllers/reviewController");
const authcontroller = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

//// from this point, no one can access any of these routes without being logged in
router.use(authcontroller.protect);

router.route("/product/:id").get(catchAsync(reviewController.getAllProductReviews));

router
  .route("/product")
  .post(
    authcontroller.restrictTo("Tourist"),
    reviewController.setProductUserIds,
    reviewController.createReview
  );

router.route("/activity/:id").get(reviewController.getAllActivityReviews);

router
  .route("/activity")
  .post(
    authcontroller.restrictTo("Tourist"),
    reviewController.setActivityUserIds,
    reviewController.createReview
  );

  router.route("/itinerary/:id").get(reviewController.getAllItineraryReviews);

router
  .route("/itinerary")
  .post(
    authcontroller.restrictTo("Tourist"),
    reviewController.setItineraryUserIds,
    reviewController.createReview
  );

  router.route("/tourGuide/:id").get(reviewController.getAllTourGuideReviews);

router
  .route("/tourGuide")
  .post(
    authcontroller.restrictTo("Tourist"),
    reviewController.setTourGuideUserIds,
    reviewController.createReview
  );

router
  .route("/:id")
  .get(reviewController.getReview)
  .delete(
    authcontroller.restrictTo("Tourist", "Admin"),
    reviewController.deleteReview
  )
  .patch(
    authcontroller.restrictTo("Tourist", "Admin"),
    reviewController.updateReview
  );

module.exports = router;
