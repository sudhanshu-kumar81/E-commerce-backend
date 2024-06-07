import express from 'express'
import { addToCart,fetchCartByUser, deleteFromCart, updateCart } from '../controller/Cart.controller.js';

const router = express.Router();
router.post('/', addToCart)
      .get('/', fetchCartByUser)
      .delete('/:id', deleteFromCart)
      .patch('/:id', updateCart)

export default router;