const express = require("express");
const {
  getUsers,
  getUser,
  createEvent,
  //   deleteWorkout,
  //   updateWorkout
} = require("../controllers/userController");

const router = express.Router();

// GET all workouts
router.get("/", getUsers);

// GET a single workout
router.get("/:id", getUser);

// POST a new workout
router.post("/", createEvent);

// // DELETE a workout
// router.delete('/:id', deleteWorkout)

// // UPDATE a workout
// router.patch('/:id', updateWorkout)

module.exports = router;
