
const activityModel = require('../models/Activity.js');
const { default: mongoose } = require('mongoose');

const createActivity = async (req, res) => {

    const { author, start_date, authoend_date, duration, locations, price, discount, tags, isOpened, reviews } = req.body;
    try {
        const activity = await activityModel.create({ author, start_date, authoend_date, duration, locations, price,  discount, tags, isOpened, reviews });
        res.status(200).json(activity)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedActivity = await activityModel.findByIdAndDelete(id);
        if (!deletedActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json({ message: 'Actitivity deleted successfully ' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Activity', error });
    }
}

const updateActivity = async (req, res) => {

    try {
        const { id } = req.params;
        //const{title,body}= req.body;
        const updatedActivity = await activityModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json(updatedActivity);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Activity', error });
    }

}

const getActivities = async (req, res) => {
    try {
       const Activities = await ActivityModel.find(); 
       res.status(200).json(Activities);  
   } catch (error) {
       res.status(500).json({ message: 'Error retrieving Activities', error }); 
   }
   }


   const getActivity = async(req,res) => {
   

    const { id } = req.params;

    try {
        // Assuming you have a Blog model set up with Mongoose
        const Activity= await ActivityModel.findById({id });

        // Send the blogs as a response
        res.status(200).json(Activity);
    } catch (error) {
        // Handle any errors that occur during the database query
        res.status(500).json({ message: 'An error occurred', error });
    }



}

module.exports = {createActivity, getActivities, getActivity, deleteActivity, updateActivity};


