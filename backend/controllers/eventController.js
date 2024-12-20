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
const notificationController = require("../controllers/notificationController");

const PromoCode = require("../models/PromoCode"); // Adjust the path as necessary

const NotificationController = require("../controllers/notificationController");

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
  const { itineraryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itineraryId)) {
    return res.status(400).json({ error: "Invalid itinerary ID" });
  }

  try {
    const itinerary = await itineraryModel.findById(itineraryId);

    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found" });
    }

    if (update.isFlagged === true) {
      await notificationController.sendFlaggedContentNotification(
        itinerary.author,
        itineraryId,
        "Itinerary",
        itinerary.title
      );
    }

    const result = await itineraryModel.findByIdAndUpdate(itineraryId, update, {
      new: true,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating itinerary:", error);
    res.status(500).json({ error: "Couldn't update itinerary data" });
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
const readItinerariesByIds = async (req, res) => {
  try {
    const { ids } = req.query; // Extract the ids from query string
    const itineraryIds = ids.split(","); // Split the ids into an array
    // Fetch the itineraries from the database based on these IDs
    const itineraries = await Itinerary.find({ _id: { $in: itineraryIds } })
    .populate('author').populate('tags');
    

    res.status(200).json(itineraries);
  } catch (error) {
    console.error("Error fetching itineraries:", error);
    res.status(500).send("Internal Server Error");
  }
};


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
    const today = new Date();
    let query = itineraryModel.find({
      start_date: { $gte: today },
      isActive: true,
    }).populate("tags author");

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
      // console.log(tagIds);
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
      .populate("category")
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

const suggestedItineraries = async (req, res) => {
  // Check if tags is an array; if it's not, make it an array (even if it's a single string)
  const tags = Array.isArray(req.query.tags)
    ? req.query.tags
    : [req.query.tags];

  try {
    // Find itineraries with matching tags
    const itineraries = await itineraryModel
      .find({
        // start_date: { $gte: today },
        isActive: true,
        isFlagged: false,
        tags: { $in: tags },
      })
      .populate("tags").populate("author"); // Ensure populated tag information is returned
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ error: "Error fetching itineraries" });
  }
};

const suggestedActivities = async (req, res) => {
  try {
    // Ensure `tags` is always an array, even if a single tag is passed in the query
    const tags = Array.isArray(req.query.tags)
      ? req.query.tags
      : [req.query.tags];
    console.log(tags);

    // Convert `tags` to ObjectId format if they are strings, since the tag field references ObjectIds
    const tagIds = tags.map((tag) => new mongoose.Types.ObjectId(tag)); // Use `new` to create ObjectId instances

    // Fetch activities that match any tag in the `tags` array
    const itineraries = await activityModel
      .find({
        // start_date: { $gte: today },
        isActive: true,
        isFlagged: false,
        tag: { $in: tagIds }, // Check if activity's tag is in the provided tags list
      })
      .populate("tag author"); // Ensure populated tag information is returned
    console.log(itineraries);
    res.json(itineraries);
  } catch (error) {
    console.error("Error fetching suggested activities:", error);
    res.status(500).json({ error: "Error fetching suggested activities" });
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
    // console.log("inside the the read");
    itineraryModel
      .findOne({ _id: new mongoose.Types.ObjectId(req.params.itineraryId) })
      .populate("tags")
      .populate("category")
      .populate("author")
      .sort({ createdAt: -1 })
      .then((result) => {
        // console.log(result);
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
    const result = `http://localhost:3000/user_itineraries/${id}`;
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
    const result = `http://localhost:3000/viewingAllvintage/${id}`;
    res.status(200).json(result);
  } else {
    res
      .status(404)
      .json({ error: "couldn't get the activity data, activity id invalid" });
  }
};

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const BookItinerary = async (req, res) => {
  const { ItineraryId } = req.params; // Event ID from URL parameters
  const { PaymentMethod, TotalPrice, NumberOfTickets } = req.body; // User ID from request body
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
      if (!itinerary.isOpened) {
        return res
          .status(400)
          .json({ error: "This itinerary will accept bookings soon" });
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
          NumberOfTickets: NumberOfTickets,
          TotalPrice: TotalPrice,
        });
      } else {
        booking = await bookingModel.create({
          ItineraryId: ItineraryId,
          UserId: UserId,
          PaymentMethod: PaymentMethod,
          Status: true,
          NumberOfTickets: NumberOfTickets,
          TotalPrice: TotalPrice,
        });
        const newWalletValue = user.wallet - TotalPrice;
        user.wallet = newWalletValue;
        await user.save({ validateBeforeSave: false });
      }

      // Add loyalty points
      // user.addLoyaltyPoints(itinerary.price);
      user.addLoyaltyPoints(TotalPrice);
      user.addAvailablePoints(TotalPrice);
      await user.save({ validateBeforeSave: false });

      res.status(200).json({
        message: "Booked successfully",
        booking,
        loyaltyPointsEarned: Math.floor(
          itinerary.price *
            (user.level === 1 ? 0.5 : user.level === 2 ? 1 : 1.5)
        ),
        newTotalPoints: user.loyaltyPoints,
        newLevel: user.level,
        newBadge: user.badge,
        newPoints: user.pointsAvailable,
        newWallet: user.wallet,
      });

      const today = new Date();

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: '"CariGo 🦌" <Carigo@test.email>',
        to: user.email, // Send to the user's email
        subject: "receipt! 🧾 Here's Your itinerary receipt!",
        text: "here is your receipt details, can't wait to meet you",
        html: `<b>thanks ${user.username} for your purchase here is your receipt details🎉:  <ul><li>Itinerary title: ${itinerary.title}</li> <li>Itinerary link: http://localhost:3000/user_itineraries/${ItineraryId}</li> <li>payment method: ${PaymentMethod}</li> <li>Number Of Tickets: ${NumberOfTickets}</li> <li>Total Price: ${TotalPrice}</li> <li>start date: ${itinerary.start_date}</li> <li>date of purchase: ${today}</li></ul></b>`,
      });

      console.log("Message sent to %s: %s", user.email, info.messageId);

      console.error({ message: "reciept sent successfully." });
    } catch (error) {
      res.status(500).json({ error: "Failed to book" });
      console.error("Error while booking:", error);
    }
  } else {
    res.status(400).json({ error: "Invalid itineray ID format" });
  }
};

const MyItineraryBookings = async (req, res) => {
  const UserId = req.user.id; // User ID from request body
  //console.log("/////////////////////////////////////////"+UserId+"//////////////////////////////////////////////////");
  if (mongoose.Types.ObjectId.isValid(UserId)) {
    try {
      const bookings = await bookingModel
        .find({ UserId, ItineraryId: { $ne: null } })
        .sort({ createdAt: -1 });
      //console.log(bookings);
      return res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
      console.error("Error while booking:", error);
    }
  } else {
    res.status(400).json({ error: "Invalid event ID format" });
  }
};

const CancelItineraryBooking = async (req, res) => {
  const UserId = req.user.id; // User ID from request body
  const { bookingId } = req.body; // Event ID from URL parameters
  if (
    mongoose.Types.ObjectId.isValid(bookingId) &&
    mongoose.Types.ObjectId.isValid(UserId)
  ) {
    try {
      const booking = await bookingModel.findById(bookingId);
      //console.log(itinerary);
      const Itinerary = booking.ItineraryId;
      const ItineraryId = Itinerary._id;
      const itineraryDate = Itinerary.start_date;

      if (itineraryDate) {
        const currDate = new Date();
        const timeDifference = itineraryDate.getTime() - currDate.getTime(); // Difference in milliseconds
        const hoursDifference = timeDifference / (1000 * 60 * 60); // Convert to hours
        if (hoursDifference >= 48) {
          const bookings = await bookingModel.updateOne(
            { _id: bookingId }, // Filter to find documents with both UserId and ItineraryId
            { $set: { Status: false } } // Update to set Status to false
          );
          res.status(200).json({
            message: "Bookings canceled successfully",
            updatedBookingsCount: bookings.modifiedCount, // shows how many bookings were updated
          });
          console.log("???????????in first????????????");
          const canceled = await bookingModel.findOne({
            ItineraryId: ItineraryId,
            status: true,
          });
          console.log("???????????in second????????????");
          if (!canceled) {
            await Itinerary.updateOne(
              { _id: ItineraryId },
              { $set: { isBooked: false } }
            );
          }
          console.log("???????????in third????????????");
        } else {
          res.status(400).json({
            message:
              "Cannot cancel booking within 48 hours of the itinerary date",
          });
        }
      } else {
        res.status(404).json({ message: "itinerary not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch booking" });
      console.error("Error while booking:", error);
    }
  } else {
    res.status(400).json({ error: "Invalid event ID format" });
  }
};

const axios = require("axios");

const currencyConversion = async (req, res) => {
  try {
    const { currency } = req.query;
    console.log(currency);
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
        result, // shows how many bookings were updated
      });
      // Access rates like: data.conversion_rates['EUR'], data.conversion_rates['EGP'], etc.
    } else {
      console.error("Error fetching exchange rates:", data.error);
      res.status(400).json({ error: data.error });
    }
  } catch (error) {
    console.error("Error making request:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching exchange rates" });
  }
};

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const create_payment_form = async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Convert to integer
      currency,
      payment_method_types: ["card"], // Supports card payments
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const redeemPromoCode = async (req, res) => {
  const { code } = req.body;
  const userId = req.user.id;
  if (!mongoose.Types.ObjectId.isValid(userId)){
    return res.status(400).json({ error: "Invalid event ID format" });
  }
  try {
    const promo = await PromoCode.findOne({ code, isActive: true, usedUsers: { $ne: userId } });
    if (!promo) {
      return res.status(404).send("invalid promo code");
    }
    if (promo.codeType === "birthDay") {
      await PromoCode.updateOne(
        { _id: promo._id },
        { $set: { isActive: false } }
      ); // Update operation)
    } else {
        // User not found, add them to the array
        await PromoCode.updateOne(
          { _id: promo._id },
          { $addToSet: { usedUsers: userId } } // `$addToSet` ensures no duplicate entries
        );
      
    }
      res.status(200).send({ discount: promo.discount });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const cancelPromoCode = async (req, res) => {
  const { code } = req.body;
  const userId = req.user.id;
  if (!mongoose.Types.ObjectId.isValid(userId)){
    return res.status(400).json({ error: "Invalid event ID format" });
  }
  try {
    const promo = await PromoCode.findOne({ code });
    if (!promo) {
      return res.status(404).send("invalid promo code");
    }
    if (promo.codeType === "birthDay") {
      await PromoCode.updateOne(
        { _id: promo._id },
        { $set: { isActive: true } }
      ); // Update operation)
    } else {
        // User found, remove them from the array
        await PromoCode.updateOne(
          { _id: promo._id },
          { $pull: { usedUsers: userId } } // `$pull` removes the specified value from the array
        );
    }
    console.log("inside cancel promo code");
    res.status(200).send({ message: "Promo code canceled successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const openBookings = async (req, res) => {
  try {
    const itineraryId = req.params.id;
    let itinerary = await itineraryModel
      .findById(itineraryId)
      .populate("interestedUsers");

    if (!itinerary) {
      return res.status(404).json({
        status: "fail",
        message: "Itinerary not found",
      });
    }

    itinerary.isOpened = true;
    await itinerary.save();

    await notificationController.sendBookingOpenedNotification(itineraryId, "Itinerary");

    res.status(200).json({
      status: "success",
      message: "Bookings opened successfully",
      data: {
        itinerary,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
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
  currencyConversion,
  suggestedItineraries,
  suggestedActivities,
  create_payment_form,
  readItinerariesByIds,


  redeemPromoCode,
  cancelPromoCode,

  openBookings,
};
