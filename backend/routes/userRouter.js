const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const joinController = require("../controllers/joiController");
const multerController = require("../controllers/multerController");
const adminController = require("../controllers/adminController");

const router = express.Router();

// GET all users
router.get("/", userController.getUsers);

// POST a new user
router.post("/signup", [joinController.validateUser], authController.signup);
router.post("/login", authController.login);


router.post('/forgotPassword', authController.forgotPassword);

router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

// UPDATE user data
router.patch("/update/:userId", userController.updateUserData);


router.get('/pending-documents',authController.restrictTo('Admin'), adminController.getPendingDocuments);
router.patch('/approve-document/:userId',authController.restrictTo('Admin'), adminController.approveDocument);
router.patch('/reject-document/:userId',authController.restrictTo('Admin'), adminController.rejectDocument);

// GET a single user
router.get("/:id", userController.getUser);

router.post("/photo", 
  multerController.uploadUserPhoto, 
  multerController.resizeUserPhoto, 
  multerController.uploadImages
);

router.post(
  '/upload-documents',
  multerController.uploadGuestDocuments,
  multerController.processGuestDocuments,
  multerController.uploadGuestDocs
);

router.patch(
  '/changePassword',
  authController.protect,
  authController.changePassword
);

router.patch(
  "/UpdateWallet",
  authController.restrictTo("Tourist"),
  userController.UpdateWallet
);

module.exports = router;