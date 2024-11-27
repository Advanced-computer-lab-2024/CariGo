const productModel = require("../models/Product");
const userModel = require("../models/User");
const purchaseModel = require("../models/Purchase");

const getAllPurchases = async (req, res) => {
  try {
    // Fetch all purchases and populate UserId and ProductId fields
    const purchases = await purchaseModel
      .find()
      .populate("UserId")
      .populate("ProductId");
    res.status(200).json(purchases);
  } catch (error) {
    // Handle any potential errors
    res.status(500).json({ message: "Error fetching purchases", error });
  }
};

const getUserPurchases = async (req, res) => {
  try {
    // Assuming req.user.id holds the UserId directly
    const UserId = req.user.id;

    // Optional: Log the UserId as a string
    console.log(UserId);

    // Fetch purchases that match the UserId
    const purchases = await purchaseModel
      .find({ UserId })
      .populate("ProductId");

    // Send back the results
    res.status(200).json(purchases);
  } catch (error) {
    // Error handling
    res.status(500).json({ message: "Error fetching purchases", error });
  }
};

const getProductPurchases = async (req, res) => {
  try {
    let totalQuantity = 0;
    // Assuming req.user.id holds the UserId directly
    const ProductId = req.params.id;
    // Optional: Log the UserId as a string
    console.log(ProductId);
    // Fetch purchases that match the UserId
    const purchases = await purchaseModel.find({ ProductId });
    purchases.forEach((purchase) => {
      totalQuantity += purchase.Quantity;
    });
    // Send back the results
    res
      .status(200)
      .json({ Purchases: purchases, TotalQuantity: totalQuantity });
  } catch (error) {
    // Error handling
    res.status(500).json({ message: "Error fetching purchases", error });
  }
};

const makePurchase = async (req, res) => {
  try {
    const UserId = req.user.id;
    const { ProductId, Quantity } = req.body;

    // Fetch the product first to check available quantity
    const product = await productModel.findById(ProductId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if there is enough quantity available
    if (product.quantity < Quantity) {
      return res.status(400).json({ message: "Insufficient product quantity" });
    }

    // Update the product's quantity
    product.quantity -= Quantity;
    await product.save();

    // Create a new purchase entry
    const purchase = await purchaseModel.create({
      UserId,
      ProductId,
      Quantity,
    });

    // Send back the purchase confirmation
    res.status(200).json(purchase);
  } catch (error) {
    // Handle any potential errors
    res.status(500).json({ message: "Error processing purchase", error });
  }
};


// const cancelPurchase = async (req, res) => {
//   try {
//     const UserId = req.user.id;
//     const { purchaseId } = req.params;

//     // Fetch the product first to check available quantity
//     const purchase =await productModel.findById(purchaseId);
//     const product = await productModel.findById(purchase.ProductId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Check if there is enough quantity available


//     // Update the product's quantity
//     product.quantity += purchase.Quantity;
//     await product.save();

//     // Create a new purchase entry
 

//     // Send back the purchase confirmation
//     res.status(200).json(purchase);
//   } catch (error) {
//     // Handle any potential errors
//     res.status(500).json({ message: "Error processing purchase", error });
//   }
// };



module.exports = {
  getAllPurchases,
  getUserPurchases,
  getProductPurchases,
  makePurchase,
};
