const Activity = require("../models/Activity");
const itinerary = require("../models/Itinerary");
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
      const today = new Date(); let allowDelete=true;
 // Get today's date

      // Query for upcoming Activities
      const activities = await Activity.find({
        start_date: { $gte: today }, // filter for activities with startDate >= today
      }).lean();  // Using .lean() for better performance if no Mongoose methods are needed
  
      // Query for upcoming Itineraries
      const itineraries = await itinerary.find({
        start_date: { $gte: today }, // filter for itineraries with startDate >= today
      }).lean();  // Using .lean() for better performance if no Mongoose methods are needed
  
      // Combine activities and itineraries
      const upcomingItems = [...activities, ...itineraries];
  
      // Iterate over each item and set allowDelete to false if the user is the author
      upcomingItems.forEach(item => {
        
        if (item.author  == req.user.id) {
          allowDelete = false;
        }
      });  // Define `today` as the current date
  
      // Create the delete request with the username and start_date
      const deleteRequest = await DeleteRequest.create({
        username: req.user.username,
        start_date: today,allowDelete :allowDelete
      });
  
      // Respond with the created request
      res.status(200).json(deleteRequest);
      console.log(" Delete Request created successfully");
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
