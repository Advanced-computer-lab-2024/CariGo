const activityModel = require("../models/Activity");
const experienceModel = require("../models/Experience");
const itineraryModel = require("../models/Itinerary");
const locationModel = require("../models/Location");
const productModel = require("../models/Product");
const ratingModel = require("../models/Rating");
const reviewModel = require("../models/Review");
const tagModel = require("../models/Tag");
const userModel = require("../models/User");
const VintageModel = require("../models/Vintage");
const mongoose = require("mongoose");
const APIFeatures = require("../utils/apiFeatures");

const createItinerary = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.body.author); // Convert to ObjectId
  const userType = await userModel.findOne({ _id: userId }); // Project only 'roles' field
  console.log(userType);
  if (!userType) {
    return res.status(404).json({ message: "user not found" });
  }
  const role = userType.role.toLowerCase();
  console.log(role);
  if (role == "tour_guide") {
    const authorId = new mongoose.Types.ObjectId(req.body.author); // Convert to ObjectId
    const {
      activities,
      language,
      price,
      locations,
      pick_up,
      drop_off,
      availability,
      tags,
      accommodation,
      transportation,
      start_date,
      end_date,
      accessibility,
    } = req.body;
    try {
      const itinerary = await itineraryModel.create({
        author: authorId, // Use the ObjectId for author
        activities,
        language,
        price,
        locations,
        pick_up,
        drop_off,
        availability,
        tags,
        accommodation,
        transportation,
        start_date,
        end_date,
        accessibility,
      });
      res.status(200).json(itinerary);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Invalid user type" });
  }
};

const createvintage = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.body.author); // Convert to ObjectId
  const userType = await userModel.findOne({ _id: userId }); // Project only 'roles' field
  if (!userType) {
    return res.status(404).json({ message: "user not found" });
  }
  console.log(userType);
  const role = userType.role.toLowerCase();
  console.log(role);
  if (role == "tourism_governer") {
    const {
      author,
      name,
      description,
      pictures,
      location,
      ticket_price,
      tags,
      opening_hours,
    } = req.body;
    console.log("ana gowa el if");
    try {
      const vintage = await VintageModel.create({
        author,
        name,
        description,
        pictures,
        location,
        ticket_price,
        tags,
        opening_hours,
      });
      res.status(200).json(vintage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Invalid user type" });
  }
};

const createProduct = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.body.author); // Convert to ObjectId
  const userType = await userModel.findOne({ _id: userId }); // Project only 'roles' field
  if (!userType) {
    return res.status(404).json({ message: "user not found" });
  }
  const role = userType.role.toLowerCase();
  console.log(role);
  if (role == "seller") {
    console.log("inside seller");
    const authorId = new mongoose.Types.ObjectId(req.body.author); // Convert to ObjectId
    const { name, picture, price, description, ratings, reviews, quantity } =
      req.body;
    try {
      const product = await productModel.create({
        author: authorId, // Use the ObjectId for author,
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
  } else {
    return res.status(400).json({ error: "Invalid user type" });
  }
};

// const readAllItineraries = async (req,res)=>{
//   const sort =req.query.sort || '-createdAt' ;
//   const validSortFields = [ "price",'-createdAt' ];
//   if (!validSortFields.includes(sort)) {
//     return res.status(400).json({ message: `Invalid sortBy parameter. Allowed values are: ${validSortFields.join(", ")}` });
//   }
//   const itineraries = await itineraryModel.find().sort(sort);

//   return res.status(200).json(itineraries);
// }

const updateItinerary = async (req, res) => {
  const update = req.body;
  console.log(update);

  if (mongoose.Types.ObjectId.isValid(req.params.itineraryId)) {
    console.log("inside the update");

    try {
      const itinerary = await itineraryModel.findById(req.params.itineraryId);

      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }

      const result = await itineraryModel.updateOne(
        { _id: new mongoose.Types.ObjectId(req.params.itineraryId) },
        { $set: update }
      );

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "couldn't update itinerary data" });
    }

  } else {
    res
      .status(500)
      .json({ error: "couldn't update user data, itinerary id invalid" });
  }
};

const readAllItineraries = async (req, res) => {
  const sort = req.query.sort || "-createdAt"; // Default to "-createdAt" if no parameter is provided

  // Validate sortBy parameter
  const validSortFields = ["price", "-createdAt"];
  if (!validSortFields.includes(sort)) {
    return res
      .status(400)
      .json({
        message:
          ' Invalid sortBy parameter. Allowed values are: ${validSortFields.join(", ")}',
      });
  }

  try {
    // Initialize APIFeatures with the query and query string
    const features = new APIFeatures(itineraryModel.find(), req.query).filter();

    // Apply sorting
    const itineraries = await features.query.sort(sort);

    if (!itineraries.length) {
      return res.status(404).json({ message: "No itineraries found" });
    }

    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

const deleteItinerary = async (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const itinerary = await itineraryModel.findById(id);

    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found" });
    }

    if (itinerary.isBooked || itinerary.booked_users.length > 0) {
      return res
        .status(403)
        .json({ error: "Cannot delete itinerary with existing bookings" });
    }
    try {
      const result = await itineraryModel.deleteOne({ _id: id });
      res
        .status(200)
        .json({ message: "Itinerary deleted successfully", result });
    } catch (error) {
      res.status(500).json({ error: "couldn't delete itinerary data" });
    }
  } else {
    res.status(500).json({ error: "Invalid itinerary ID" });
  }
};

const deleteVintage = async (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const vintage = await VintageModel.findById(id);

    if (!vintage) {
      return res.status(404).json({ error: "Vintage not found" });
    }
    try {
      const result = await VintageModel.deleteOne({ _id: id });
      res.status(200).json({ message: "Vintage deleted successfully", result });
    } catch (error) {
      res.status(500).json({ error: "couldn't delete vintage data" });
    }
  } else {
    res.status(500).json({ error: "Invalid vintage ID" });
  }
};

const readSingleItinerary = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.itineraryId)) {
    console.log("inside the the read");
    itineraryModel
      .findOne({ _id: new mongoose.Types.ObjectId(req.params.itineraryId) })
      .sort({ createdAt: -1 })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "couldn't get itinerary data" });
      });
  } else {
    res
      .status(500)
      .json({ error: "couldn't get the itinerary data, itinerary id invalid" });
  }
};

const readAllVintages = async (req, res) => {
  const { id } = req.query;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "not a valid Id" });
    }
    const historicPlaces = await VintageModel.find({ author: id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(historicPlaces);
  } catch (error) {
    res
      .status(500)
      .json({ error: "couldn't get the historical place data, id invalid" });
  }
};

const updateVintage = async (req, res) => {
  const update = req.body;
  console.log(update);

  if (mongoose.Types.ObjectId.isValid(req.params.vintageId)) {
    console.log("inside the update");
    
    try {
      // Check if the vintage item exists first
      const vintage = await VintageModel.findById(req.params.vintageId);

      if (!vintage) {
        return res.status(404).json({ error: "Historical place not found" });
      }

      // Update the vintage item
      const result = await VintageModel.updateOne(
        { _id: new mongoose.Types.ObjectId(req.params.vintageId) },
        { $set: update }
      );

      res.status(200).json(result);

    } catch (error) {
      console.error("Error updating vintage:", error);
      res
        .status(500)
        .json({ error: "Couldn't update historical place data" });
    }
  } else {
    res
      .status(400)  // Use 400 for invalid input
      .json({ error: "Invalid vintage ID" });
  }
};

const readSingleVintage = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.vintageId)) {
    console.log("inside read vintage");
    VintageModel.findOne({
      _id: new mongoose.Types.ObjectId(req.params.vintageId),
    })
      .sort({ createdAt: -1 })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "couldn't get historical place data" });
      });
  } else {
    res
      .status(500)
      .json({ error: "couldn't get historical place data, id invalid" });
  }
};

const readMyItineraries = async (req, res) => {
  const { id } = req.query;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "not a valid Id" });
    }
    const itineraries = await itineraryModel.find({ author: id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(itineraries);
  } catch (error) {
    res
      .status(500)
      .json({ error: "couldn't get the itinerary data, itinerary id invalid" });
  }
};

module.exports = {
  createItinerary,
  createvintage,
  createProduct,
  readAllItineraries,
  readMyItineraries,
  readSingleItinerary,
  updateItinerary,
  readAllVintages,
  readSingleVintage,
  updateVintage,
  deleteItinerary,
  deleteVintage,
};
