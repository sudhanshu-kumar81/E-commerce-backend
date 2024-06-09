import express from 'express'
import { addToCart,fetchCartByUser, deleteFromCart, updateCart } from '../controller/Cart.controller.js';
import {authenticate} from '../middleware/authenticate.js'

const router = express.Router();
router.post('/',authenticate, addToCart)
      .get('/',authenticate, fetchCartByUser)
      .delete('/:id',authenticate, deleteFromCart)
      .patch('/:id',authenticate, updateCart)

export default router;