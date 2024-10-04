const Activity = require('../models/Activity');
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

const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find(); // Fixed from ActivityModel to Activity
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Activities', error });
    }
};

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

module.exports = { createActivity, getActivities, getActivity, deleteActivity, updateActivity };
