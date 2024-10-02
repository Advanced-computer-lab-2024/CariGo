const express = require('express')
const {
  getUsers, 
//   getWorkout, 
//   createWorkout, 
//   deleteWorkout, 
//   updateWorkout
} = require('../controllers/userController')

const router = express.Router()

// GET all workouts
router.get('/', getUsers)

// // GET a single workout
// router.get('/:id', getWorkout)

// // POST a new workout
// router.post('/', createWorkout)

// // DELETE a workout
// router.delete('/:id', deleteWorkout)

// // UPDATE a workout
// router.patch('/:id', updateWorkout)

module.exports = router