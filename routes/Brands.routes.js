import express from 'express'
import { fetchBrands,createBrand } from '../controller/Brand.controlller.js';
const router = express.Router();
//  /categories is already added in base path
router.get('/', fetchBrands)
.post('/',createBrand)

export default router;
