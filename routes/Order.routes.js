import express from 'express'

import { createOrder, fetchAllOrders, deleteOrder, updateOrder } from '../controller/Order.controller.js';

const router = express.Router();
//  /orders is already added in base path
router.post('/', createOrder)
      .get('/', fetchAllOrders)
      .delete('/:id', deleteOrder)
      .patch('/:id', updateOrder)


export default router;