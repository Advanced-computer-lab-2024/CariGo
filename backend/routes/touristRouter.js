const express = require("express");
const touristController = require("./../controllers/touristController");
const authController = require("./../controllers/authController");
// const joinController = require("./../controllers/joiController");
const complaintController = require('../controllers/complaintsController');


const router = express.Router();

// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);

////After this , all protected: ////
// router.use(authController.protect);

// router.patch("/updateMyPassword", authController.updatePassword);
router.use(authController.protect);

router.get("/MyAccount", touristController.getMe, touristController.getTourist);
router.patch("/updateMe", touristController.updateMe);
router.delete("/deleteMe", touristController.deleteMe);

router.post(
  "/fileComplaint",
  authController.restrictTo("Tourist"),
  complaintController.fileComplaint
);
router.get(
  "/myComplaints",
  authController.restrictTo("Tourist"),
  complaintController.getMyComplaints
);

//// After this is all is restricted to admin: ////
router.use(authController.restrictTo("Admin"));

router.route("/").get(touristController.updateMe);

router
  .route("/:id")
  .get(touristController.getTourist)
  .patch(touristController.updateTourist)
  .delete(touristController.deleteTourist);



module.exports = router;
