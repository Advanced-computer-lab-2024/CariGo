const express = require("express");
const {
  getUsers,
  getUser,
  updateUserData,
  //   deleteWorkout,
  //   updateWorkout
} = require("../controllers/userController");

const authController = require("../controllers/authController");
const joinController = require("../controllers/joiController");

const router = express.Router();

// GET all workouts
router.get("/", getUsers);

// POST a new user
router.post("/signup",[joinController.validateUser] ,authController.signup);
router.post("/login", authController.login);

// UPDATE user data
router.use(authController.protect);
router.patch("/update/:userId", updateUserData);
// GET a single workout
router.get("/:id", getUser);
module.exports = router;
