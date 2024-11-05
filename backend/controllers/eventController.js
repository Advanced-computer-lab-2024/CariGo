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
const Category = require("../models/Category");
const bookingModel = require("../models/Bookings");
const Itinerary = require("../models/Itinerary");
const User = require("../models/User");

const createItinerary = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.body.author); // Convert to ObjectId
  const userType = await userModel.findOne({ _id: userId }); // Project only 'roles' field
  console.log(userType);
  console.log("Ana gowa");
  if (!userType) {
    return res.status(404).json({ message: "user not found" });
  }
  const role = userType.role.toLowerCase();
  console.log(role);
  if (role == "tour_guide") {
    const authorId = new mongoose.Types.ObjectId(req.body.author); // Convert to ObjectId
    console.log("creating");
    const {
      title,
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
      category,
    } = req.body;
    try {
      const itinerary = await itineraryModel.create({
        author: authorId, // Use the ObjectId for author
        title,
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
        category,
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
// const readAllItineraries = async (req, res) => {
//   const sort = req.query.sort || "-createdAt"; // Default to "-createdAt" if no parameter is provided
//   const tagTitle = req.query.tags; // Get the tag title from query parameters

//   // Validate sortBy parameter
//   const validSortFields = ["price", "-createdAt", "ratingsAverage"];
//   if (!validSortFields.includes(sort)) {
//       return res.status(400).json({
//           message: `Invalid sortBy parameter. Allowed values are: ${validSortFields.join(", ")}`,
//       });
//   }

//   try {
//       // Initialize the query
//       let query = itineraryModel.find();

//       // Check if a tag title is provided
//       if (!tagTitle) {
//           // Initialize APIFeatures with the query and query string
//           const features = new APIFeatures(query, req.query).filter();

//           // Apply sorting
//           const itineraries = await features.query.sort(sort);

//           if (!itineraries.length) {
//               return res.status(404).json({ message: "No itineraries found" });
//           }

//           res.status(200).json(itineraries);
//       } else {
//           // If tagTitle is provided, filter based on tags
//           const tagIds = await tagModel.find({ title: tagTitle }).select('_id');
//           query = query.where('tags').in(tagIds);

//           // Delete the 'tag' key from req.query
//           delete req.query.tags;

//           // Optionally, initialize APIFeatures with the modified query
//           const features = new APIFeatures(query, req.query).filter();

//           // Apply sorting
//           const itineraries = await features.query.sort(sort);

//           if (!itineraries.length) {
//               return res.status(404).json({ message: "No itineraries found" });
//           }

//           res.status(200).json(itineraries);
//       }
//   } catch (error) {
//       res.status(500).json({ message: "An error occurred", error });
//   }
// };

const readAllItineraries = async (req, res) => {
  const sort = req.query.sort || "-createdAt"; // Default to "-createdAt" if no parameter is provided
  const tagTitle = req.query.tags;
  // Get the tag title from query parameters

  // Validate sort parameter
  const validSortFields = ["price", "-createdAt", "ratingsAverage"];
  if (!validSortFields.includes(sort)) {
    return res.status(400).json({
      message: `Invalid sortBy parameter. Allowed values are: ${validSortFields.join(
        ", "
      )}`,
    });
  }

  try {
    // Initialize the query
    let query = itineraryModel.find();

    // Check if a tag title is provided
    let itineraries = []; // Declare itineraries with let
    if (!tagTitle) {
      // Initialize APIFeatures with the query and query string
      const features = new APIFeatures(query, req.query).filter();

      // Apply sorting
      itineraries = await features.query.sort(sort);
    } else {
      // If tagTitle is provided, filter based on tags
      const tagIds = await tagModel.find({ title: tagTitle }).select("_id");
      console.log(tagIds);
      query = query.where("tags").in(tagIds);

      // Delete the 'tags' key from req.query
      delete req.query.tags;

      // Optionally, initialize APIFeatures with the modified query
      const features = new APIFeatures(query, req.query).filter();

      // Apply sorting
      itineraries = await features.query.sort(sort);
    }

    if (!itineraries.length) {
      return res.status(404).json({ message: "No itineraries found" });
    }

    // Collect all tag IDs and category IDs from the itineraries
    const allTagIds = itineraries.flatMap((itinerary) => itinerary.tags || []);
    // const allCategoryIds = [...new Set(itineraries.map(itinerary => itinerary.category))]; // Unique category IDs

    // Fetch tags and categories
    const tags = await tagModel.find({ _id: { $in: allTagIds } });
    // const categories = await Category.find({ _id: { $in: allCategoryIds } });

    // Create maps for quick lookup
    const tagMap = {};
    tags.forEach((tag) => {
      tagMap[tag._id] = tag.title; // Map tag IDs to their titles
    });

    // const categoryMap = {};
    // categories.forEach(category => {
    //     categoryMap[category._id] = category.name; // Map category IDs to their names
    // });

    // Replace tag IDs and category ID in itineraries with corresponding titles/names
    const formattedItineraries = itineraries.map((itinerary) => ({
      ...itinerary._doc, // Spread original itinerary fields
      tags: itinerary.tags.map((tagId) => tagMap[tagId] || tagId), // Replace tag IDs with titles
      // category: categoryMap[itinerary.category] || itinerary.category // Replace category ID with name
    }));

    return res.status(200).json(formattedItineraries);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

const readMyItineraries = async (req, res) => {
  const { id } = req.query;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "not a valid Id" });
    }
    const itineraries = await itineraryModel
      .find({ author: id })
      .populate("tags")
      .sort({
        createdAt: -1,
      });
    return res.status(200).json(itineraries);
  } catch (error) {
    res
      .status(500)
      .json({ error: "couldn't get the itinerary data, itinerary id invalid" });
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
      .populate("tags")
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
      .json({ error: "couldn't get the itinerary data, itinerary id invalid" });
  }
};

const updateVintage = async (req, res) => {
  const update = req.body;
  console.log(update);

  if (mongoose.Types.ObjectId.isValid(req.params.vintageId)) {
    console.log("inside the update");
    VintageModel.updateOne(
      { _id: new mongoose.Types.ObjectId(req.params.vintageId) },
      { $set: update }
    )
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: "couldn't update historical place data" });
      });
  } else {
    res
      .status(500)
      .json({ error: "couldn't update historical place data, id invalid" });
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

const viewAllVintage = async (req, res) => {
  console.log("in");
  try {
    console.log("inside try");
    const vintages = await VintageModel.find();
    res.status(200).json(vintages);
  } catch (error) {
    console.log("entered catch");
    res
      .status(500)
      .json({ message: "An error occurred while retrieving vintages", error });
  }
};

const readAllVintage = async (req, res) => {
  const { tag } = req.query;

  try {
    let vintages;

    if (tag) {
      // Find all vintages that contain the specified tag in their tags array
      vintages = await VintageModel.find({ tags: { $in: [tag] } });
    } else {
      // If no tag is provided, return all vintages
      vintages = await VintageModel.find();
    }

    if (!vintages.length) {
      return res.status(404).json({ message: "No vintages found" });
    }

    res.status(200).json(vintages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while retrieving vintages", error });
  }
};

const shareItinerary = async (req, res) => {
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
    const result = `http://localhost:3000/Tourist-itineraries/${id}`;
    res.status(200).json(result);
  } else {
    res
      .status(404)
      .json({ error: "couldn't get the activity data, activity id invalid" });
  }
};

const shareVintage = async (req, res) => {
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
    const result = `http://localhost:3000/allVintages/${id}`;
    res.status(200).json(result);
  } else {
    res
      .status(404)
      .json({ error: "couldn't get the activity data, activity id invalid" });
  }
};

const BookItinerary = async (req, res) => {
  const { ItineraryId } = req.params; // Event ID from URL parameters
  const { PaymentMethod } = req.body; // User ID from request body
  const UserId = req.user.id;
  let CardNumber;
  let booking; // Declare booking outside of if-else to use in response
  if (
    mongoose.Types.ObjectId.isValid(ItineraryId) &&
    mongoose.Types.ObjectId.isValid(UserId)
  ) {
    try {
      const itinerary = await Itinerary.findById(ItineraryId);
      if (!itinerary) {
        return res.status(404).json({ error: "Iternirary not found" });
      }
      await Itinerary.findByIdAndUpdate(ItineraryId, { isBooked: true });

      const user = await User.findById(UserId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (PaymentMethod == "Card") {
        CardNumber = req.body.CardNumber;
        booking = await bookingModel.create({
          ItineraryId: ItineraryId,
          UserId: UserId,
          PaymentMethod: PaymentMethod,
          Status: true,
          CardNumber: CardNumber,
        });
      } else {
        booking = await bookingModel.create({
          ItineraryId: ItineraryId,
          UserId: UserId,
          PaymentMethod: PaymentMethod,
          Status: true,
        });
      }

      // Add loyalty points
      user.addLoyaltyPoints(itinerary.price);
      await user.save({ validateBeforeSave: false });

      res.status(200).json({
        message: "Booked successfully",
        booking,
        loyaltyPointsEarned: Math.floor(itinerary.price * (user.level === 1 ? 0.5 : user.level === 2 ? 1 : 1.5)),
        newTotalPoints: user.loyaltyPoints,
        newLevel: user.level,
        newBadge: user.badge,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to book" });
      console.error("Error while booking:", error);
    }
  } else {
    res.status(400).json({ error: "Invalid itineray ID format" });
  }
};


const MyItineraryBookings = async (req, res) => {
  const { UserId } = req.body; // User ID from request body
  if (mongoose.Types.ObjectId.isValid(UserId)) {
    try {
      const bookings = await bookingModel
        .find({ UserId, ItineraryId: { $ne: null } })
        .sort({ createdAt: -1 });
      return res.status(200).json(bookings);
    } catch {
      res.status(500).json({ error: "Failed to fetch bookings" });
      console.error("Error while booking:", error);
    }
  } else {
    res.status(400).json({ error: "Invalid event ID format" });
  }
};

const CancelItineraryBooking = async (req, res) => {
  const { UserId } = req.body; // User ID from request body
  const { ItineraryId } = req.body; // Event ID from URL parameters
  if (
    mongoose.Types.ObjectId.isValid(ItineraryId) &&
    mongoose.Types.ObjectId.isValid(UserId)
  ) {
    try {
      const itinerary = await itineraryModel.findById(ItineraryId);
      const itineraryDate = itinerary.start_date;

      if (itineraryDate) {
        const currDate = new Date();
        const timeDifference = itineraryDate.getTime() - currDate.getTime(); // Difference in milliseconds
        const hoursDifference = timeDifference / (1000 * 60 * 60); // Convert to hours

        if (hoursDifference >= 48) {
          const bookings = await bookingModel.updateMany(
            { UserId, ItineraryId }, // Filter to find documents with both UserId and ItineraryId
            { $set: { Status: false } } // Update to set Status to false
          );
          res.status(200).json({
            message: "Bookings canceled successfully",
            updatedBookingsCount: bookings.modifiedCount, // shows how many bookings were updated
          });
        } else {
          res
            .status(400)
            .json({
              message:
                "Cannot book/cancel within 48 hours of the itinerary date",
            });
        }
      } else {
        res.status(404).json({ message: "itinerary not found" });
      }
    } catch {
      res.status(500).json({ error: "Failed to fetch booking" });
      console.error("Error while booking:", error);
    }
  } else {
    res.status(400).json({ error: "Invalid event ID format" });
  }

};

const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const currencyConversion = async (req, res) => {
  try {
    const { currency } = req.body;
    const key = process.env.currencyConversionKey;
    const url = `https://v6.exchangerate-api.com/v6/${key}/pair/EGP/${currency}`;
    const response = await axios.get(url);
    const data = response.data;
    const result = data.conversion_rate;
    if (data.result === "success") {
      console.log("Exchange rates:", data.conversion_rate);
      console.log("Exchange rates:", result);
      res.status(200).json({
        message: "Currency conversion successful",
        result // shows how many bookings were updated
      });
      // Access rates like: data.conversion_rates['EUR'], data.conversion_rates['EGP'], etc.
    } else {
      console.error("Error fetching exchange rates:", data.error);
      res.status(400).json({ error: data.error });
    }
  } catch (error) {
    console.error("Error making request:", error);
    res.status(500).json({ error: "An error occurred while fetching exchange rates" });
  }
};

module.exports = {
  createItinerary,
  createvintage,
  createProduct,
  readAllItineraries,
  readSingleItinerary,
  updateItinerary,
  readAllVintages,
  readSingleVintage,
  updateVintage,
  deleteItinerary,
  deleteVintage,
  readAllVintage,
  readMyItineraries,
  viewAllVintage,
  shareItinerary,
  shareVintage,
  BookItinerary,
  MyItineraryBookings,
  CancelItineraryBooking,
  currencyConversion
};
