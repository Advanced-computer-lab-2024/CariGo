const express = require("express");
const {
  createExperience,
  //   deleteWorkout,
  //   updateWorkout
} = require("../controllers/experienceController");

const router = express.Router();

// POST a new experience

router.post("/createExperience", createExperience);

module.exports = router;