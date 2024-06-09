import express from 'express'
import { fetchUserById,updateUser } from '../controller/User.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();
//  /users is already added in base path fetchAllOrdersOfUser
router.get('/:id',authenticate, fetchUserById)
      .patch('/:id',authenticate, updateUser)
     

export default router;