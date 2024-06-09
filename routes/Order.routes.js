import express from 'express'

import { createOrder, fetchAllOrders, deleteOrder, updateOrder,fetchOrderOfUser } from '../controller/Order.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();
//  /orders is already added in base path
router.post('/',authenticate, createOrder)
      .get('/',authenticate, fetchAllOrders)
      .delete('/:id',authenticate, deleteOrder)
      .patch('/:id',authenticate, updateOrder)
      .get('/:id',authenticate,fetchOrderOfUser)


export default router;