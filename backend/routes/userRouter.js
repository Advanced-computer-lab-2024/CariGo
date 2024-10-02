const express = require("express");
const {
  getUsers,
  getUser,
  updateUserData,
  //   deleteWorkout,
  //   updateWorkout
} = require("../controllers/userController");

const router = express.Router();

// GET all workouts
router.get("/", getUsers);

// GET a single workout
router.get("/:id", getUser);

// POST a new workout


// // DELETE a workout
// router.delete('/:id', deleteWorkout)

// // UPDATE a workout
// router.patch('/:id', updateWorkout)

router.patch("/update/:userId",updateUserData);

module.exports = router;
