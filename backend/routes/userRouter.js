const express = require("express");
const {
  getUsers,
  getUser,
  updateUserData,
  //   deleteWorkout,
  //   updateWorkout
} = require("../controllers/userController");

const authController = require("../controllers/authController");

const router = express.Router();

// GET all workouts
router.get("/", getUsers);

// GET a single workout
router.get("/:id", getUser);

// POST a new user
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// // DELETE a workout
// router.delete('/:id', deleteWorkout)

// // UPDATE a workout
// router.patch('/:id', updateWorkout)

router.patch("/update/:userId",updateUserData);

module.exports = router;
