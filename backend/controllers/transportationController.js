const Activity = require("../models/Activity");
const Transportation = require("../models/Transportation");
const Category = require("../models/Category");
const Tag = require("../models/Tag");
const APIFeatures = require("../utils/apiFeatures");
// const User = require('./../models/userModel');
const activityModel = require("../models/Activity");
// const CategoryModel = require("../models/Category");
const mongoose = require("mongoose");
const bookingModel = require("../models/Bookings");

const createTransportation = async (req, res) => {
  try {
    const {
      driverNumber,
      carType,
      plateNumber,
      departureHour,
      departureMinutes,
      departureDayTime,

      duration,
      arrivalHour,
      arrivalMinutes,
      arrivalDayTime,
      price,
      ac,
      arrivalLon,
      arrivalLan,
      arrivalDescription,
      departureLan,
      departureLon,
      departureDescription,date
    } = req.body;

    // Create location objects
    const departureLocation = {
      type :'Point',
      coordinates: [departureLon, departureLan],
      description: departureDescription,
    };
    
    const arrivalLocation = {
      type :'Point',
      coordinates: [arrivalLon, arrivalLan],
      description: arrivalDescription,
    };
    
    // Create time objects
    const departureTime = {
      hours: departureHour,
      minutes: departureMinutes,
      dayTime : departureDayTime
    };
    
    const arrivalTime = {
      hours: arrivalHour,
      minutes: arrivalMinutes,
      dayTime :arrivalDayTime
    };

    // Create the activity
    const transportation = await Transportation.create({
      driverNumber,
      carType,
      plateNumber,
      departureTime,
      duration,
      arrivalTime,
      price,
      ac,
      arrivalLocation,
      departureLocation,
      author: req.user.id,date
    });

    res.status(200).json(transportation);
    console.log("Transportation created successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const deleteTransportation = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deletedTransportation = await Transportation.findByIdAndDelete(id); // Fixed from activityModel to Activity
    if (!deletedTransportation) {
      return res.status(404).json({ message: "Transportation not found" });
    }
    res.status(200).json({ message: "Transportation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Activity", error });
  }
};

const getTransportations = async (req, res) => {
  try {
    // Extract query parameters
    const { depLat, depLon, depDesc, arrLat, arrLon, arrDesc, date, radius = 3000 } = req.query;

    // Validate input parameters
    if (!depLat || !depLon || !depDesc || !arrLat || !arrLon || !arrDesc || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Parse latitude and longitude to numbers
    const depLatNum = parseFloat(depLat);
    const depLonNum = parseFloat(depLon);
    const arrLatNum = parseFloat(arrLat);
    const arrLonNum = parseFloat(arrLon);

    // Check if the coordinates are valid numbers
    if (isNaN(depLatNum) || isNaN(depLonNum) || isNaN(arrLatNum) || isNaN(arrLonNum)) {
      return res.status(400).json({ message: "Invalid latitude or longitude" });
    }

    // Convert coordinates into GeoJSON Point format
    const depLocation = {
      type: "Point",
      coordinates: [depLonNum, depLatNum], // MongoDB expects [longitude, latitude]
    };
    const arrLocation = {
      type: "Point",
      coordinates: [arrLonNum, arrLatNum],
    };

    // Normalize the date to the start of the day to avoid time zone issues
    const searchDate = new Date(date);
    searchDate.setHours(0, 0, 0, 0);  // Normalize to start of the day (00:00:00)

    // Convert radius to radians (as MongoDB expects it in radians)
    const radiusInRadians = radius / 6378.1;

    // First, try to find transportations using coordinates
    let transportationOptions = await Transportation.find({
      $and: [
        {
          departureLocation: {
            $geoWithin: {
              $centerSphere: [depLocation.coordinates, radiusInRadians],
            },
          },
        },
        {
          arrivalLocation: {
            $geoWithin: {
              $centerSphere: [arrLocation.coordinates, radiusInRadians],
            },
          },
        },
        { date: { $eq: date } },
        { bookingOpened: true },
      ],
    });

    // If no options found, try searching by description
    if (transportationOptions.length === 0) {
      // Escape special characters for regex search
      const depDescEscaped = depDesc.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');
      const arrDescEscaped = arrDesc.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');

      transportationOptions = await Transportation.find({
        $and: [
          {
            "departureLocation.description": { $regex: new RegExp(depDescEscaped, 'i') },
          },
          {
            "arrivalLocation.description": { $regex: new RegExp(arrDescEscaped, 'i') },
          },
          { date: { $eq: searchDate } },
          { bookingOpened: true },
        ],
      });
    }

    // Split into am and pm
    const amList = transportationOptions.filter(option => option.departureTime.dayTime === 'am');
    const pmList = transportationOptions.filter(option => option.departureTime.dayTime === 'pm');

    // Sort each list by departureTime.hours
    amList.sort((a, b) => a.departureTime.hours - b.departureTime.hours);
    pmList.sort((a, b) => a.departureTime.hours - b.departureTime.hours);

    // Combine the lists: am first, then pm
    const sortedTransportationOptions = [...amList, ...pmList];

    // Send the response
    res.status(200).json(sortedTransportationOptions);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




const getAdvTransportation = async (req, res) => {
  try {
    const id = req.user.id;

    // Fetch activities
    const transportations = await Transportation.find({ author: id });

    if (!transportations.length) {
      return res.status(404).json({ message: "Transportations not found" });
    }

    res.status(200).json(transportations);
  } catch (error) {
    console.error("Error retrieving activities:", error);
    res
      .status(500)
      .json({ message: "Error retrieving activities", error: error.message });
  }
};

const updateTransportation = async (req, res) => {
  const { id } = req.params; // Extract the ID from the URL parameters
  const updates = req.body; // Get the updates from the request body

  try {
    // Find the transportation document by ID and update it
    const updatedTransportation = await Transportation.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true } // Options: return the updated document and run validators
    );

    // If the transportation document is not found, return a 404 error
    if (!updatedTransportation) {
      return res.status(404).json({ message: "Transportation not found" });
    }

    // Return the updated transportation document
    res.status(200).json(updatedTransportation);
  } catch (error) {
    // Handle errors (e.g., validation errors)
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};


const getTransportation = async (req, res) => {
  const { id } = req.params;
  try {
    const transportation = await Transportation.findById(id); // Fixed from ActivityModel to Activity, and use findById(id)
    if (!transportation) {
      return res.status(404).json({ message: "transportation not found" });
    }
    res.status(200).json(transportation);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};



const shareActivity = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (mongoose.Types.ObjectId.isValid(id)) {
    // activityModel
    //   .findOne({ _id: new mongoose.Types.ObjectId(id)},{ link: 1, _id: 0 })
    //   .then((result) => {
    //     res.status(200).json(result);
    //   })
    //   .catch((error) => {
    //     res.status(500).json({ error: "couldn't get itinerary data" });
    //   });
    const result = `http://localhost:3000/activities/${id}`;
    res.status(200).json(result);
  } else {
    res
      .status(404)
      .json({ error: "couldn't get the activity data, activity id invalid" });
  }
};

const BookActivity = async (req, res) => {
  const { ActivityId } = req.params; // Event ID from URL parameters
  const { UserId, PaymentMethod } = req.body; // User ID from request body
  console.log(UserId);
  let CardNumber;
  let booking; // Declare booking outside of if-else to use in response
  if (
    mongoose.Types.ObjectId.isValid(ActivityId) &&
    mongoose.Types.ObjectId.isValid(UserId)
  ) {
    try {
      if (PaymentMethod == "Card") {
        CardNumber = req.body.CardNumber;
        booking = await bookingModel.create({
          ActivityId: ActivityId,
          UserId: UserId,
          PaymentMethod: PaymentMethod,
          Status: true,
          CardNumber: CardNumber,
        });
      } else {
        booking = await bookingModel.create({
          ActivityId: ActivityId,
          UserId: UserId,
          PaymentMethod: PaymentMethod,
          Status: true,
        });
      }

      res.status(200).json({
        message: " booked successfully",
        booking,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to book" });
      console.error("Error while booking:", error);
    }
  } else {
    res.status(400).json({ error: "Invalid event ID format" });
  }
};

const MyBookings = async (req, res) => {
  const { UserId } = req.body; // User ID from request body
  if (mongoose.Types.ObjectId.isValid(UserId)) {
    try {
      const bookings = await bookingModel.find({UserId}).sort({createdAt: -1});
      return res.status(200).json(bookings);
    } catch {
      res.status(500).json({ error: "Failed to fetch bookings" });
      console.error("Error while booking:", error);
    }
  } else {
    res.status(400).json({ error: "Invalid event ID format" });
  }
};

const CancelBooking = async (req, res) => {
    const { UserId } = req.body; // User ID from request body
    const { ActivityId } = req.params; // Event ID from URL parameters
    if (mongoose.Types.ObjectId.isValid(ActivityId) && mongoose.Types.ObjectId.isValid(UserId)) {
        try {
            const bookings = await bookingModel.updateMany(
                { UserId, ActivityId }, // Filter to find documents with both UserId and ActivityId
                { $set: { Status: false } } // Update to set Status to false
              );
              res.status(200).json({
                message: "Bookings canceled successfully",
                updatedBookingsCount: bookings.modifiedCount // shows how many bookings were updated
              }); 
        } catch {
          res.status(500).json({ error: "Failed to fetch booking" });
          console.error("Error while booking:", error);
        }
      } else {
        res.status(400).json({ error: "Invalid event ID format" });
      }
};

module.exports = {
  createTransportation ,
  getTransportations,
  getTransportation,
  deleteTransportation,
  updateTransportation,
  getAdvTransportation,
  shareActivity,
  BookActivity,
  MyBookings,
  CancelBooking
};
