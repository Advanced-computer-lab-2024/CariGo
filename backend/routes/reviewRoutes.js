const express = require("express");

const reviewController = require("./../controllers/reviewController");
const authcontroller = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

//// from this point, no one can access any of these routes without being logged in
router.use(authcontroller.protect);

router.route("/product/:id").get(reviewController.getAllProductReviews);

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
