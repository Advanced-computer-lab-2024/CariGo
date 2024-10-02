const userModel = require('./models/User');
const activityModel = require('./models/Activity.js');
const activityModel = require('./models/Activity.js');
const { default: mongoose } = require('mongoose');

const createActivity = async (req, res) => {

    const { author, start_date, authoend_date, duration, locations, price, catagory, discount, tags, isOpened, reviews } = req.body;
    try {
        const activity = await activityModel.create({ author, start_date, authoend_date, duration, locations, price, catagory, discount, tags, isOpened, reviews });
        res.status(200).json(activity)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}