const experienceModel = require("../models/Experience");
const userModel = require("../models/User");
const mongoose = require("mongoose");

const createExperience = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.body.author); // Convert to ObjectId
  const userType = await userModel.findOne({ _id: userId }); // Project only 'roles' field
  if (!userType) {
    return res.status(404).json({ message: "user not found" });
  }
  // console.log(userType);
  const role = userType.role.toLowerCase();
  console.log(role);
  if (role == "tour_guide") {
    const {
      author,
      years_of_experience,
      company,
      title,
      start_date,
      end_date,
      work_description,
    } = req.body;
    console.log("ana gowa el if");
    try {
      const experience = await experienceModel.create({
        author,
        years_of_experience,
        company,
        title,
        start_date,
        end_date,
        work_description,
      });
      res.status(200).json(experience);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Invalid user type" });
  }
};

module.exports = {createExperience}