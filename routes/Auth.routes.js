import express from 'express'
import { createUser,loginUser } from '../controller/Auth.controller.js';

const router = express.Router();
//  /auth is already added in base path
router.post('/signup', createUser).post('/login', loginUser);

export default router;