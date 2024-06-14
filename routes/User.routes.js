import express from 'express'
import { resetPassword } from '../controller/User.controller.js';
import { fetchUserById,updateUser ,createUser,loginUser} from '../controller/User.controller.js';
import { resetPasswordRequestHandler } from '../controller/User.controller.js';
import { authenticate } from '../middleware/authenticate.js';
const router = express.Router();
//  /users is already added in base path fetchAllOrdersOfUser
router.get('/fetchUserById',authenticate, fetchUserById)
      .patch('/updateUser/:id',authenticate, updateUser)
      .post('/signup', createUser)
      .post('/login', loginUser)
      .post('/reset-password-request',resetPasswordRequestHandler)
      .post('/reset-password',resetPassword)

    
export default router;