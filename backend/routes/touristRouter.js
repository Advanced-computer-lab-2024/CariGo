const express = require("express");
const touristController = require("./../controllers/touristController");
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
  touristController.getMe,
  touristController.getTourist
);
router.patch("/updateMe", touristController.updateMe);
router.delete("/deleteMe", touristController.deleteMe);


//// After this is all is restricted to admin: ////
router.use(authController.protect);
router.use(authController.restrictTo("Admin"));

router.route("/").get(touristController.updateMe);

router
  .route("/:id")
  .get(touristController.getTourist)
  .patch(touristController.updateTourist)
  .delete(touristController.deleteTourist);


module.exports = router;
