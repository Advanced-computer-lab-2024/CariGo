const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const multerController = require('../controllers/multerController');
const router = express.Router();



router.get('/', productController.getProducts);

router.get('/:id', productController.getProduct);
router.get('/getSellersProducts/:id', productController.getSellersProducts);
router.post(
    '/createProduct',
    authController.protect,
    multerController.uploadProductImages,
    multerController.resizeProductImages,
    productController.createProduct
  );
  
  router.patch(
    '/updateProduct/:id',
    authController.protect,
    multerController.uploadProductImages,
    multerController.resizeProductImages,
    productController.updateProduct
  );
  

router.delete('/deleteProduct/:id', productController.deleteProduct);

module.exports = router;