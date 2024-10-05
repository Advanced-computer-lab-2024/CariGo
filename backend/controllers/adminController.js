const { Admin } = require('mongodb');
const userModel = require('../models/User');
const categoryModel = require('../models/Category');
const tagModel = require('../models/Tag');

const { default: mongoose } = require('mongoose');
const bcrypt = require("bcrypt");

const addAdmin = async (req, res) => {
    const { username, password, passwordConfirm, email, about } = req.body;

    try {
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        if (password !== passwordConfirm) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const newAdmin = await userModel.create({
            username,
            email,
            password, 
            passwordConfirm,
            about,
            role: 'Admin', 
        });

        res.status(201).json({ message: "Admin created successfully", newAdmin });
    } catch (error) {
        console.error("Error during user creation:", error); // Log the error for debugging
        res.status(400).json({ error: error.message });
    }
};



const deleteUser = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await userModel.deleteOne({ username });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addTourismGovernor = async (req, res) => {
    const { username, password, passwordConfirm, email, about } = req.body;

    try {
        console.log(req.body); // Log the incoming data

        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        if (password !== passwordConfirm) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Create the new tourism governor user
        const newGovernor = await userModel.create({
            username,
            email,
            password,  
            passwordConfirm, 
            about,
            role: 'Tourism_Governer', 
        });

        res.status(201).json({ message: "Tourism Governor created successfully", newGovernor });
    } catch (error) {
        console.error("Error during tourism governor creation:", error); // Log the error for debugging
        res.status(400).json({ error: error.message });
    }
};

const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await categoryModel.create({name, description})
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
  
  
  const getCategories = async (req, res) => {
    try {
      const categories = await categoryModel.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
  
    try {
      const updatedCategory = await categoryModel.findByIdAndUpdate(
        id,
        { name, description },
        { new: true, runValidators: true }
      );
  
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json({ message: 'Category updated successfully', updatedCategory });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteCategory = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedCategory = await categoryModel.findByIdAndDelete(id);
  
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
 const createTag = async (req, res) => {
    const {title} = req.body;
  
    try {
      const existingTag = await tagModel.findOne({title});
      if (existingTag) {
        return res.status(400).json({ message: 'Preference Tag already exists' });
      }
  
      const tag = await tagModel.create({title})
      res.status(201).json({ message: 'Preference Tag created successfully', tag });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getTags = async (req, res) => {
    try {
      const tags = await tagModel.find();
      res.status(200).json(tags);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const updateTag = async (req, res) => {
    const { id } = req.params;
    const {type} = req.body;
  
    try {
      const updatedTag = await tagModel.findByIdAndUpdate(
        id,
        {type},
        { new: true, runValidators: true }
      );
  
      if (!updatedTag) {
        return res.status(404).json({ message: 'Preference Tag not found' });
      }
  
      res.status(200).json({ message: 'Preference Tag updated successfully', updatedTag });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteTag = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedTag = await tagModel.findByIdAndDelete(id);
  
      if (!deletedTag) {
        return res.status(404).json({ message: 'Preference Tag not found' });
      }
  
      res.status(200).json({ message: 'Preference Tag deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
module.exports = { addAdmin, deleteUser, addTourismGovernor, createCategory, getCategories, updateCategory, deleteCategory, createTag, getTags, updateTag, deleteTag};

