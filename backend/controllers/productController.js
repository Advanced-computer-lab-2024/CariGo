const { json } = require("express");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");
// const User = require('./../models/userModel');

const createProduct = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newProduct = await Product.create({
    author: req.body.author,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    quantity: req.body.quantity,
    mainImage: req.body.mainImage, // Main image from the request body
    images: req.body.images, // Additional images from the request body
  });

  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      quantity: req.body.quantity,
      mainImage: req.body.mainImage, // Update main image
      images: req.body.images, // Update additional images
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      product: updatedProduct,
    },
  });
});

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id); // Fixed from activityModel to Activity
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Product", error });
  }
};

const getProducts = async (req, res) => {
  try {
    // console.log(req.query);
    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const queryObj = JSON.parse(queryStr);

    //console.log(queryObj+" "+attributeToBeSorted);
    //  console.log(2);
    const attributeToBeSorted = queryObj["sort"];

    if (queryObj["sort"]) queryObj["sort"] = undefined;
    // console.log(queryStr+" "+attributeToBeSorted + "   "+ req.params);
    const products = await Product.find(queryObj).sort(
      attributeToBeSorted ? "-ratingsAverage" : { createdAt: -1 }
    ); // Fixed from ActivityModel to Activity
    //  console.log( products[0].ratingsAverage['avgSoFar'])
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Products", error });
  }
};

const getTouristProducts = async (req, res) => {
  try {
    // Parse and format query string
    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const queryObj = JSON.parse(queryStr);

    // Add archive condition to filter out archived products
    queryObj.archived = false;

    // Handle sorting attribute if specified
    const attributeToBeSorted = queryObj["sort"];
    if (queryObj["sort"]) queryObj["sort"] = undefined;

    // Execute query with sorting, fallback to createdAt if no attributeToBeSorted
    const products = await Product.find(queryObj).sort(
      attributeToBeSorted ? "-ratingsAverage" : { createdAt: -1 }
    ).populate("author"); // Fixed from ActivityModel to Activity

    // Send response
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Products", error });
  }
};

const getSellersProducts = async (req, res) => {
  try {
    //  console.log(req.query.sort+" "+req.query);
    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const id = req.params;
    console.log(req.params);
    const queryObj = JSON.parse(queryStr);
    //  console.log(2);
    // console.log(queryObj+" "+attributeToBeSorted);
    const attributeToBeSorted = queryObj["sort"];
    if (queryObj["sort"]) queryObj["sort"] = undefined;
    // console.log(queryStr+" "+attributeToBeSorted + "   "+ req.params);
    const products = await Product.find({ author: id["id"] }).sort(
      attributeToBeSorted ? "-ratingsAverage" : { createdAt: -1 }
    ); // Fixed from ActivityModel to Activity
    //  console.log( products[0].ratingsAverage['avgSoFar'])
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Products", error });
  }
};
const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("author"); // Fixed from ActivityModel to Activity, and use findById(id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

const archiveProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(
    id,
    { archived: true },
    { new: true }
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({
    status: "success",
    data: { product },
  });
});

const unarchiveProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(
    id,
    { archived: false },
    { new: true }
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({
    status: "success",
    data: { product },
  });
});
const getTitlesForEachUser = async (req, res) => {
  const id  = req.params.id;
  console.log(id)
  try {
    const products= await Product.find({author:id}); // Fixed from ActivityModel to Activity, and use findById(id)
    if (!products) {
      return res.status(404).json({ message: "Activity not found" });
    }
  //console.log(activities)
 // console.log("---------------")
  //console.log(itineraries)
    const Ptitles =(products)?products.map(activity => activity.name):[];
    
   
    //const titles = ;
   // Atitles.push(...Ititles);
    res.status(200).json(
      {productTitles:Ptitles,
        success:true
      });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getTitlesForEachUser,
  getTouristProducts,
  getSellersProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  archiveProduct,
  unarchiveProduct,
};
