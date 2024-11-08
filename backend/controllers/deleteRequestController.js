const Activity = require("../models/Activity");
const itinerary = require("../models/Itinerary");
const Transportation= require("../models/Transportation");
const Category = require("../models/Category");
const Tag = require("../models/Tag");
const APIFeatures = require("../utils/apiFeatures");
// const User = require('./../models/userModel');
const activityModel = require("../models/Activity");
// const CategoryModel = require("../models/Category");
const mongoose = require("mongoose");
const bookingModel = require("../models/Bookings");
const User = require("../models/User");
const DeleteRequest = require("../models/DeleteRequest");
const moment = require("moment"); 

const createDeleteRequest = async (req, res) => {
  try {
    // Get today's date
    const today = new Date();
    let allowDelete = true;

    // Initialize an array of models to check
    const modelsToCheck = [Activity, itinerary, Transportation];

    // Iterate over the models
    for (let model of modelsToCheck) {
      // Query to find all documents in the model (no date filter)
      const items = await model.find().lean();

      // Iterate over each item to check conditions
      for (let item of items) {
        if (item.author == req.user.id) {
          if (item.isBooked === false) {
            // If isBooked is false, delete the document
            await model.deleteOne({ _id: item._id });
            console.log(`${model.modelName} with ID ${item._id} deleted due to isBooked=false`);
          } else if (item.isBooked === true) {
            // If isBooked is true, set isActive to false
            await model.updateOne({ _id: item._id }, { $set: { isActive: false } });
            console.log(`${model.modelName} with ID ${item._id} updated: isActive set to false`);
          }
        }
      }
    }

    // After processing all models, proceed to delete the user
    await User.deleteOne({ _id: req.user.id });
    console.log(`User with ID ${req.user.id} deleted`);



    // Respond with the created request
    res.status(200).json(deleteRequest);
    console.log("Delete Request created successfully");

  } catch (error) {
    // Log the error and send the error message in the response
    console.error(error);  // Log the error for debugging
    res.status(400).json({ error: error.message });
  }
};


  

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deleteReq = await DeleteRequest.findByIdAndDelete(id); // Fixed from activityModel to Activity
    if (!deleteReq) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Activity", error });
  }
};

const getAllRequests = async (req, res) => {
  try {
    // Fetch all delete requests from the database
    const requests = await DeleteRequest.find();

    // Get the current time
    const currentTime = moment();

    // Process each request to calculate the time difference
    const requestsWithTimeDifference = requests.map((request) => {
      // Assuming `request.date` is the date the request was created
      const requestDate = moment(request.date);

      // Calculate the difference in human-readable format
      const timeDifference = currentTime.from(requestDate, true); // "true" gives a concise format like "2 hours ago"

      return {
        ...request.toObject(),  // Convert Mongoose document to plain object
        timeDifference,         // Add the time difference to the request object
      };
    });

    // Send the result
    res.json(requestsWithTimeDifference);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};



module.exports = {
  createDeleteRequest,
  getAllRequests,

  deleteRequest,
}
