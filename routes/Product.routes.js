import express from 'express'
import { createProduct,fetchAllProducts,fetchProductById,updateProduct } from '../controller/Product.controller.js';
import { authenticate } from '../middleware/Authenticate.js';


const router = express.Router();
//  /products is already added in base path
router.post('/',authenticate, createProduct)
      .get('/',authenticate, fetchAllProducts)
      .get('/:id',authenticate, fetchProductById)
      .patch('/:id',authenticate, updateProduct)

export default router;
