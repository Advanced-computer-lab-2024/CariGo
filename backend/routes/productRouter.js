const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const router = express.Router();



router.get('/', productController.getProducts);

router.get('/:id', productController.getProduct);

router.post('/createProduct',authController.protect, productController.createProduct);

router.patch('/updateProduct/:id',productController.updateProduct);

router.delete('/deleteProduct/:id', productController.deleteProduct);


module.exports = router;