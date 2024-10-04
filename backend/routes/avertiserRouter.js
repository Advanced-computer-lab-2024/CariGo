const express = require("express");
const advertiserController = require("./../controllers/advertiserController");
const authController = require("./../controllers/authController");
// const joinController = require("./../controllers/joiController");

const router = express.Router();

// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);

////After this , all protected: ////
// router.use(authController.protect);

// router.patch("/updateMyPassword", authController.updatePassword);

router.get(
  "/MyAccount",
  advertiserController.getMe,
  advertiserController.getAdvertiser
);
router.patch("/updateMe", advertiserController.updateMe);
router.delete("/deleteMe", advertiserController.deleteMe);


//// After this is all is restricted to admin: ////
router.use(authController.restrictTo("Admin"));

router.route("/").get(advertiserController.getAllAdvertisers);

router
  .route("/:id")
  .get(advertiserController.getAdvertiser)
  .patch(advertiserController.updateAdvertiser)
  .delete(advertiserController.deleteAdvertiser);


module.exports = router;
