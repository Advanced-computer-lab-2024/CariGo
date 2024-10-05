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
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such User" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No such User" });
  }

  res.status(200).json(user);
};


const updateUserData = (req, res) => {
  const update = req.body; 
  console.log(update);

  if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
    console.log("inside the update");
    User
      .updateOne({ _id: new mongoose.Types.ObjectId(req.params.userId) }, { $set: update })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "couldn't update user data" });
      });
  } else {
    res
      .status(500)
      .json({ error: "couldn't update user data, user id invalid" });
  }
};


module.exports = {
  getUsers,
  getUser,
  updateUserData
  //   deleteWorkout,
  //   updateWorkout
};
