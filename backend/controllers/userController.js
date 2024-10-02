const User = require("../models/User.js");
const mongoose = require("mongoose");
const productModel = require("../models/Product.js");

// get all users
const getUsers = async (req, res) => {
  const users = await User.find({isActive: true}).sort({ createdAt: -1 });

  res.status(200).json(users);
};

// get a single workout
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such User" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No such User" });
  }

  res.status(200).json(user);
};

const createEvent = async (req, res) => {
  
  const userType = req.body.roles;
  console.log(userType);
  if (userType == "advertizer") {
    const {
      author,
      start_date,
      end_date,
      time,
      location,
      price,
      category,
      discount,
      tags,
      isOpened,
      ratings,
      reviews,
    } = req.body;
    try {
      const activity = await activityModel.create({
        author,
        start_date,
        end_date,
        time,
        location,
        price,
        category,
        discount,
        tags,
        isOpened,
        ratings,
        reviews,
      });
      res.status(200).json(activity);
    } catch (error) {
      res.status(400).json({ error: error.message }); //res.status(500).json({error:couldn't create a new ${targetedCollection}});
    }
  } else if (userType == "seller") {
    console.log("inside seller");
    const authorId = new mongoose.Types.ObjectId(req.body.author); // Convert to ObjectId
    const {
      name,
      picture,
      price,
      description,
      ratings,
      reviews,
      quantity,
    } = req.body;
    try {
      const product = await productModel.create({
        author: authorId,  // Use the ObjectId for author,
        name,
        picture,
        price,
        description,
        ratings,
        reviews,
        quantity,
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (userType == "tour guide") {
    const authorId = mongoose.Types.ObjectId(req.body.author); // Convert to ObjectId
    const { activities, language, price, location, availability } =
      req.body;
    try {
      const itinerary = await itineraryModel.create({
        author: authorId,  // Use the ObjectId for author
        activities,
        language,
        price,
        location,
        availability,
      });
      res.status(200).json(itinerary);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Invalid user type" });
  }
};
// create a new user
// const createWorkout = async (req, res) => {
//   const {title, load, reps} = req.body

//   // add to the database
//   try {
//     const workout = await Workout.create({ title, load, reps })
//     res.status(200).json(workout)
//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }
// }

// // delete a workout
// const deleteWorkout = async (req, res) => {

// }

// // update a workout
// const updateWorkout = async (req, res) => {

// }

module.exports = {
  getUsers,
  getUser,
  createEvent,
  //   deleteWorkout,
  //   updateWorkout
};
