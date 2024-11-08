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
  console.log(user);

  if (!user) {
    return res.status(404).json({ error: "No such User" });
  }

  res.status(200).json(user);
};


const updateUserData = (req, res) => {
  const update = req.body; 
  console.log(update +"  llllllll");

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

const UpdateWallet = async (req, res) => {
  const  UserId  = req.user.id; // User ID from request body
  const {numOfTickets,price,conversionRate } = req.body; // Event ID from URL parameters
  console.log(UserId);
  if (mongoose.Types.ObjectId.isValid(UserId)) {
    try {
      const user = await User.findById(UserId);
      //console.log(itinerary);

          const refund = (price*conversionRate) * numOfTickets;
          const cashBack = user.wallet + refund ;
          const walletNewValue = await User.updateOne(
            { _id: UserId }, // Filter to find documents with both UserId and ItineraryId
            { $set: { wallet: cashBack } } // Update to set Status to false
          );
          res.status(200).json({
            message: "refund done successfully",
            updatedWallet: walletNewValue.modifiedCount, // shows how many bookings were updated
          });
        
       
    } catch(error) {
      
      res.status(500).json({ error: "Failed to fetch user" });
      console.error("Error while refunding:", error);
    }
  } else {
    res.status(400).json({ error: "Invalid user ID format" });
  }
};

const RedeemPoints = async (req, res) => {
  const  UserId  = req.user.id; // User ID from request body
  const {numOfPoints} = req.body; // Event ID from URL parameters
  console.log(UserId);
  if (mongoose.Types.ObjectId.isValid(UserId)) {
    try {
      const user = await User.findById(UserId);
      //console.log(itinerary);
          const cash = numOfPoints/10;
          const cashBack = user.wallet + cash ;
          const newPoints = user.pointsAvailable - numOfPoints ;
          const updatedPoints = await User.updateOne(
            { _id: UserId }, // Filter to find documents with both UserId and ItineraryId
            { $set: { pointsAvailable: newPoints,wallet: cashBack  } }
          );
          res.status(200).json({
            message: "Points redeemed successfully.",
            updatedPoints: updatedPoints.modifiedCount, // shows how many bookings were updated
          });
        
       
    } catch(error) {
      
      res.status(500).json({ error: "Failed to fetch user" });
      console.error("Error while redeeming:", error);
    }
  } else {
    res.status(400).json({ error: "Invalid user ID format" });
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUserData,
  UpdateWallet,
  RedeemPoints
  //   deleteWorkout,
  //   updateWorkout
};
