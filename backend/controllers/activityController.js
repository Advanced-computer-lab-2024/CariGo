const Activity = require("../models/Activity");
const Category = require("../models/Category");
const Tag = require("../models/Tag");
const APIFeatures = require("../utils/apiFeatures");
// const User = require('./../models/userModel');
const activityModel = require("../models/Activity");
// const CategoryModel = require("../models/Category");
const mongoose = require("mongoose");
const boockingModel = require("../models/Bookings");

const createActivity = async (req, res) => {
  try {
    const {
      start_date,
      end_date,
      duration,
      lon,
      lan,
      minPrice,
      maxPrice,
      discount,
      tag,
      bookingOpened,
      category,
      title,
      description,
    } = req.body;

    // Validate that end_date is after start_date
    const price = {
      range: {
        min: minPrice,
        max: maxPrice,
      },
    };
    const locations = {
      lon: lon,
      lan: lan,
    };
    if (new Date(end_date) <= new Date(start_date)) {
      return res
        .status(400)
        .json({ error: "End date must be after start date" });
    }

    // Find the category by name

    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return res.status(400).json({ error: "Please choose a valid category" });
    }

    // Find the tag by title

    const tagDoc = await Tag.findOne({ title: tag });
    if (!tagDoc) {
      return res.status(400).json({ error: "Please choose a valid tag" });
    }

    // Create the activity with the category and tag IDs
    const activity = await Activity.create({
      start_date,
      end_date,
      duration,
      locations,
      price,
      discount,
      tag: tagDoc._id,
      bookingOpened,
      Category: categoryDoc._id, // Use the category ID
      author: req.user.id,
      description,
      title,
    });

    res.status(200).json(activity);
    console.log("activity created successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deletedActivity = await Activity.findByIdAndDelete(id); // Fixed from activityModel to Activity
    if (!deletedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Activity", error });
  }
};

const getActivities = async (req, res) => {
  const today = new Date();
  let sortBy = req.query.sort || "-createdAt"; // Default to "-createdAt" if no parameter is provided

  // Validate sortBy parameter
  const validSortFields = ["discount", "price", "ratingsAverage", "-createdAt"];
  if (!validSortFields.includes(sortBy)) {
    return res
      .status(400)
      .json({
        message: `Invalid sortBy parameter. Allowed values are: ${validSortFields.join(
          ", "
        )}`,
      });
  }

  // Change sortBy to "price.range.min" if it is "price"
  if (sortBy === "price") {
    sortBy = "price.range.min";
  }

  const categoryName = req.query.Category;

  if (categoryName) {
    try {
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      req.query.Category = category._id; // Replace the category name with the category ID
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "An error occurred while fetching the category",
          error,
        });
    }
  }

  // Check if the price parameter is provided
  const priceParam = req.query.price ? parseFloat(req.query.price) : null;

  // Initialize the query with base conditions
  const query = Activity.find({ start_date: { $gte: today } });

  // Add category filter if it exists
  if (req.query.Category) {
    query.where({ Category: req.query.Category });
  }

  // If price parameter is provided, filter activities based on price range
  console.log(priceParam);
  if (priceParam !== null) {
    query.where({
      $and: [
        { "price.range.min": { $lte: priceParam } }, // Price is greater than or equal to min
        { "price.range.max": { $gte: priceParam } }, // Price is less than or equal to max
      ],
    });
    // Remove price parameter from req.query
    delete req.query.price;
  }

  try {
    // Initialize APIFeatures with the query and query string
    const features = new APIFeatures(query, req.query).filter();

    // Apply sorting
    const activities = await features.query.sort(sortBy);

    if (!activities.length) {
      return res.status(404).json({ message: "Activities not found" });
    }

    // Collect all tag and category IDs from the activities
    const tagIds = activities
      .map((activity) => activity.tag)
      .filter((tag) => tag);
    const categoryIds = activities
      .map((activity) => activity.Category)
      .filter((category) => category);

    // Fetch tags and categories based on the collected IDs
    const tags = await Tag.find({ _id: { $in: tagIds } });
    const categories = await Category.find({ _id: { $in: categoryIds } });

    // Create a map for quick lookup
    const tagMap = {};
    tags.forEach((tag) => {
      tagMap[tag._id] = tag.title; // Map tag IDs to their titles
    });

    const categoryMap = {};
    categories.forEach((category) => {
      categoryMap[category._id] = category.name; // Map category IDs to their names
    });

    // Replace IDs in activities with corresponding titles/names
    const formattedActivities = activities.map((activity) => ({
      ...activity._doc, // Spread original activity fields
      tag: tagMap[activity.tag] || activity.tag, // Replace tag ID with title or keep original if not found
      Category: categoryMap[activity.Category] || activity.Category, // Replace category ID with name or keep original if not found
    }));

    res.status(200).json(formattedActivities);
  } catch (error) {
    console.error("Error retrieving activities:", error);
    res
      .status(500)
      .json({ message: "Error retrieving activities", error: error.message });
  }
};

// const getAdvActivities = async (req, res) => {
//     try {
//         const id = req.user.id;

//         // Corrected the find method syntax
//         const activities = await Activity.find({ author: id });

//         if (!activities.length) {
//             return res.status(404).json({ message: 'Activities not found' });
//         }

//         res.status(200).json(activities);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving activities', error });
//     }
// };
const getAdvActivities = async (req, res) => {
  try {
    const id = req.user.id;

    // Fetch activities
    const activities = await Activity.find({ author: id });

    if (!activities.length) {
      return res.status(404).json({ message: "Activities not found" });
    }

    // Collect all tag and category IDs from the activities
    const tagIds = activities
      .map((activity) => activity.tag)
      .filter((tag) => tag);
    const categoryIds = activities
      .map((activity) => activity.Category)
      .filter((category) => category);

    // Fetch tags and categories based on the collected IDs
    const tags = await Tag.find({ _id: { $in: tagIds } });
    const categories = await Category.find({ _id: { $in: categoryIds } });

    // Create a map for quick lookup
    const tagMap = {};
    tags.forEach((tag) => {
      tagMap[tag._id] = tag.title; // Map tag IDs to their titles
    });

    const categoryMap = {};
    categories.forEach((category) => {
      categoryMap[category._id] = category.name; // Map category IDs to their names
    });

    // Replace IDs in activities with corresponding titles/names
    const formattedActivities = activities.map((activity) => ({
      ...activity._doc, // Spread original activity fields
      tag: tagMap[activity.tag] || activity.tag, // Replace tag ID with title or keep original if not found
      Category: categoryMap[activity.Category] || activity.Category, // Replace category ID with name or keep original if not found
    }));

    res.status(200).json(formattedActivities);
  } catch (error) {
    console.error("Error retrieving activities:", error);
    res
      .status(500)
      .json({ message: "Error retrieving activities", error: error.message });
  }
};

const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { tag, category, ...otherFields } = req.body; // Change to lowercase for consistency

    // Check if a tag is provided
    if (tag) {
      const foundTag = await Tag.findOne({ title: tag });
      if (foundTag) {
        req.body.tag = foundTag._id; // Store the tag ID
      } else {
        return res.status(404).json({ message: "Tag not found" });
      }
    }

    // Check if a category is provided
    if (category) {
      console.log("Searching for category:", category); // Log the category before search
      const foundCategory = await Category.findOne({ name: category }); // Use lowercase
      console.log("Found category:", foundCategory); // Log the found category

      if (foundCategory) {
        req.body.Category = foundCategory._id; // Store the category ID
      } else {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    // Update the activity
    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      { ...otherFields, ...req.body },
      { new: true }
    );
    if (!updatedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(500).json({ message: "Error updating Activity", error });
  }
};

// const getActivities = async (req, res) => {
//     const today = new Date();
//     const sortBy = req.query.sort || '-createdAt'; // Default to "discount" if no parameter is provided
//   // Default to ascending order

//     // Validate sortBy parameter
//     console.log(sortBy);
//     const validSortFields = ['discount', "price", "ratingsAverage",'-createdAt'];
//     if (!validSortFields.includes(sortBy)) {
//       return res.status(400).json({ message: `Invalid sortBy parameter. Allowed values are: ${validSortFields.join(", ")}` });
//     }

//     try {
//       const activities = await Activity.find({ start_date: { $gt: today } })
//         .sort(sortBy); // Dynamic sorting based on query parameter

//       if (!activities.length) {
//         return res.status(404).json({ message: 'No upcoming activities found' });
//       }

//       res.status(200).json(activities);
//     } catch (error) {
//       res.status(500).json({ message: 'An error occurred', error });
//     }
// };

const getActivity = async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findById(id); // Fixed from ActivityModel to Activity, and use findById(id)
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

const sortActivities = async (req, res) => {
  const today = new Date();
  const sortBy = req.query.type || "discount"; // Default to "discount" if no parameter is provided
  const sortOrder = req.query.sortOrder === "desc" ? -1 : 1; // Default to ascending order

  // Validate sortBy parameter
  console.log(sortBy);
  const validSortFields = ["discount", "price", "ratingsAverage"];
  if (!validSortFields.includes(sortBy)) {
    return res
      .status(400)
      .json({
        message: `Invalid sortBy parameter. Allowed values are: ${validSortFields.join(
          ", "
        )}`,
      });
  }

  try {
    const activities = await Activity.find({ start_date: { $gt: today } }).sort(
      sortBy
    ); // Dynamic sorting based on query parameter

    if (!activities.length) {
      return res.status(404).json({ message: "No upcoming activities found" });
    }

    res.status(200).json(activities);
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
    const result = `http://localhost:3000/tourist-activities/${id}`;
    res.status(200).json(result);
  } else {
    res
      .status(404)
      .json({ error: "couldn't get the activity data, activity id invalid" });
  }
};

const BookActivity = async (req, res) => {
  const { id } = req.params; // Event ID from URL parameters
  const { userId } = req.body; // User ID from request body

  if (mongoose.Types.ObjectId.isValid(id)) {
    try {
      // First, find the booking document by the event ID
      const booking = await boockingModel.findOne({ event: id });

      if (!booking) {
        return res
          .status(404)
          .json({ message: "Booking not found for the given event ID." });
      }

      // Then, update the BookedUsers array with the new userId
      const updatedBooking = await boockingModel.updateOne(
        { _id: booking._id },
        { $push: { BookedUsers: userId } }
      );

      res
        .status(200)
        .json({
          message: "User added to booking successfully",
          booking: updatedBooking,
        });
    } catch (error) {
      res.status(500).json({ error: "Failed to add user to booking" });
      console.error("Error adding user to booking:", error);
    }
  } else {
    res.status(400).json({ error: "Invalid event ID format" });
  }
};

module.exports = {
  createActivity,
  getActivities,
  getActivity,
  deleteActivity,
  updateActivity,
  sortActivities,
  getAdvActivities,
  shareActivity,
};
