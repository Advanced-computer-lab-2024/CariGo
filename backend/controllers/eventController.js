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

const createItinerary = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.body.author); // Convert to ObjectId
  const userType = await userModel.findOne({ _id: userId }); // Project only 'roles' field
  if (!userType) {
    return res.status(404).json({ message: "user not found" });
  }
  const role = userType.roles.toLowerCase();
  console.log(role);
  if (role == "tour_guide") {
    const authorId = new mongoose.Types.ObjectId(req.body.author); // Convert to ObjectId
    const { activities, language, price, location, availability } = req.body;
    try {
      const itinerary = await itineraryModel.create({
        author: authorId, // Use the ObjectId for author
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

const createvintage = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.body.author); // Convert to ObjectId
  const userType = await userModel.findOne({ _id: userId }); // Project only 'roles' field
  if (!userType) {
    return res.status(404).json({ message: "user not found" });
  }
  const role = userType.roles.toLowerCase();
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
    console.log("ana gowa el if")
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
  const role = userType.roles.toLowerCase();
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

const createActivity = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.body.author); // Convert to ObjectId
  const userType = await userModel.findOne({ _id: userId }); // Project only 'roles' field
  if (!userType) {
    return res.status(404).json({ message: "user not found" });
  }
  const role = userType.roles.toLowerCase();
  console.log(role);
  if (role == "advertiser") {
    const authorId = new mongoose.Types.ObjectId(req.body.author); // Convert to ObjectId
    const {
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
        author: authorId,
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
  } else {
    return res.status(400).json({ error: "Invalid user type" });
  }
};

const readAllItineraries = async (req,res)=>{
  const itineraries = await itineraryModel.find().sort({ createdAt: -1 });

  return res.status(200).json(itineraries);
}

const updateItinerary = async (req,res)=>{
  const update = req.body; 
  console.log(update);

  if (mongoose.Types.ObjectId.isValid(req.params.itineraryId)) {
    console.log("inside the update");
    itineraryModel
      .updateOne({ _id: new mongoose.Types.ObjectId(req.params.itineraryId) }, { $set: update })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "couldn't update itinerary data" });
      });
  } else {
    res
      .status(500)
      .json({ error: "couldn't update user data, itinerary id invalid" });
  }
}

const readSingleItinerary= (req,res) => {

  if (mongoose.Types.ObjectId.isValid(req.params.itineraryId)) {
    console.log("inside the the read");
    itineraryModel
      .findOne({ _id: new mongoose.Types.ObjectId(req.params.itineraryId) }).sort({ createdAt: -1 })
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
}

const readAllVintages = async (req,res)=>{
  const historicPlaces = await VintageModel.find().sort({ createdAt: -1 });

  return res.status(200).json(historicPlaces);
}

const updateVintage = async (req,res)=>{
  const update = req.body; 
  console.log(update);

  if (mongoose.Types.ObjectId.isValid(req.params.vintageId)) {
    console.log("inside the update");
    VintageModel
      .updateOne({ _id: new mongoose.Types.ObjectId(req.params.vintageId) }, { $set: update })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "couldn't update historical place data" });
      });
  } else {
    res
      .status(500)
      .json({ error: "couldn't update historical place data, id invalid" });
  }
}

const readSingleVintage= (req,res) => {

  if (mongoose.Types.ObjectId.isValid(req.params.vintageId)) {
    console.log("inside read vintage");
    VintageModel
      .findOne({ _id: new mongoose.Types.ObjectId(req.params.vintageId) }).sort({ createdAt: -1 })
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
}


const readActivities = async (req,res)=>{
  const activities = await activityModel.find().sort({ createdAt: -1 });

  return res.status(200).json(activities);
}

module.exports = {
    createItinerary,
    createvintage,
    createProduct,
    createActivity,
    readAllItineraries,
    readSingleItinerary,
    updateItinerary,
    readAllVintages,
    readSingleVintage,
    updateVintage,
    readActivities
};
