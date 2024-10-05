const Activity = require('../models/Activity');
const APIFeatures = require('../utils/apiFeatures');
// const User = require('./../models/userModel');

const createActivity = async (req, res) => {
    const { start_date, end_date, duration, locations, price, discount, tags, bookingOpened } = req.body;
    try {
        console.log(req.body);
        const activity = await Activity.create({ start_date, end_date, duration, locations, price, discount, tags, bookingOpened, author: req.user.id });
        res.status(200).json(activity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedActivity = await Activity.findByIdAndDelete(id); // Fixed from activityModel to Activity
        if (!deletedActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Activity', error });
    }
};

const getActivities = async (req, res) => {
    const today = new Date();
    const sortBy = req.query.sort || '-createdAt'; // Default to "-createdAt" if no parameter is provided

    // Validate sortBy parameter
    const validSortFields = ['discount', 'price', 'ratingsAverage', '-createdAt'];
    if (!validSortFields.includes(sortBy)) {
        return res.status(400).json({ message: `Invalid sortBy parameter. Allowed values are: ${validSortFields.join(", ")}` });
    }

    try {
        // Initialize APIFeatures with the query and query string
        const features = new APIFeatures(Activity.find({ start_date: { $gt: today } }), req.query)
            .filter();

        // Apply sorting

        const activities = await features.query.sort(sortBy);

        if (!activities.length) {
            return res.status(404).json({ message: 'No upcoming activities found' });
        }

        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};

const updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, { new: true }); // Fixed from activityModel to Activity
        if (!updatedActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json(updatedActivity);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Activity', error });
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
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};

const sortActivities = async (req, res) => {
    const today = new Date();
    const sortBy = req.query.type || 'discount'; // Default to "discount" if no parameter is provided
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1; // Default to ascending order

    // Validate sortBy parameter
    console.log(sortBy);
    const validSortFields = ['discount', "price", "ratingsAverage"];
    if (!validSortFields.includes(sortBy)) {
        return res.status(400).json({ message: `Invalid sortBy parameter. Allowed values are: ${validSortFields.join(", ")}` });
    }

    try {
        const activities = await Activity.find({ start_date: { $gt: today } })
            .sort(sortBy); // Dynamic sorting based on query parameter

        if (!activities.length) {
            return res.status(404).json({ message: 'No upcoming activities found' });
        }

        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};




module.exports = { createActivity, getActivities, getActivity, deleteActivity, updateActivity, sortActivities };
