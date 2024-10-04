const { json } = require('express');
const Product = require('../models/Product');
// const User = require('./../models/userModel');

const createProduct = async (req, res) => {
    const { name, picture, description, price, ratings, quantity} = req.body;
    try {
const product = await Product.create({ name, picture, description:description, price,quantity,ratings, author: req.user.id });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id); // Fixed from activityModel to Activity
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Product', error });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true }); // Fixed from activityModel to Activity
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Product', error });
    }
};
const getProducts = async (req, res) => {
    try {
        console.log(req.query.sort+" "+req.query);
        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        
        const queryObj = JSON.parse(queryStr);
      //  console.log(2);
       // console.log(queryObj+" "+attributeToBeSorted);
        const attributeToBeSorted = queryObj['sort'];
        if(queryObj['sort']) queryObj['sort'] = undefined  
        console.log(queryStr+" "+attributeToBeSorted + "   "+ req.params);
        const products = await Product.find(queryObj).sort(attributeToBeSorted?(attributeToBeSorted):{ createdAt: -1 }); // Fixed from ActivityModel to Activity
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Products', error });
    }
};  

const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id); // Fixed from ActivityModel to Activity, and use findById(id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};

module.exports = { createProduct, getProducts, getProduct, deleteProduct, updateProduct };
