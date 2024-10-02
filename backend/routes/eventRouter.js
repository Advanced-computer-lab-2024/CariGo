const express = require("express");
const {
  getUsers,
  getUser,
  createEvent,
  //   deleteWorkout,
  //   updateWorkout
} = require("../controllers/userController");

const router = express.Router();

router.post('/createEvent', createEvent);

module.exports = router;