const express = require("express");
const {
  addAdmin,
  deleteUser,
  addTourismGovernor,
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createTag,
  getTags,
  updateTag,
  deleteTag,
  getUser,
  createPromoCode,
  revenueReport,
  userReport
} = require("../controllers/adminController");
const authController = require("../controllers/authController");
const complaintController = require('../controllers/complaintsController');

const router = express.Router();

router.get("/getTags", getTags);
router.get("/getCategories", getCategories);

router.use(authController.protect);
router.post("/addAdmin", addAdmin);
//router.delete("/deleteUser",deleteUser);
router.post("/deleteUser", getUser);
router.post("/addTourismGovernor", addTourismGovernor);

router.post("/createCategory", createCategory);

router.put("/updateCategory/:id", updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);

router.post("/createTag", createTag);

router.put("/updateTag/:id", updateTag);
router.delete("/deleteTag/:id", deleteTag);

router.get(
  "/viewAllComplaints",
  authController.restrictTo("Admin"),
  complaintController.getAllComplaints
);
router.get(
  "/viewComplaint/:id",
  authController.restrictTo("Admin"),
  complaintController.getComplaint
);
router.patch(
  "/updateComplaintStatus/:id",
  authController.restrictTo("Admin"),
  complaintController.updateComplaintStatus
);
router.post(
  "/replyToComplaint/:id",
  authController.restrictTo("Admin"),
  complaintController.replyToComplaint
);
router.get(
  "/filterComplaintsByStatus/:status",
  authController.restrictTo("Admin"),
  complaintController.getComplaintsByStatus
);

router.post(
  "/promo-code",
  authController.restrictTo("Admin"),
  createPromoCode);

router.get(
  "/report",
  // authController.restrictTo("Admin"),
  revenueReport
)

router.get(
  "/user_report",
  // authController.restrictTo("Admin"),
  userReport
)

module.exports = router;
