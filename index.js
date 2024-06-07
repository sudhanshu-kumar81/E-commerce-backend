import express from 'express'
import dotenv from 'dotenv'
import connectDB from './middleware/database.js'
import ProductRoutes from './routes/Product.routes.js'
import BrandRoutes from './routes/Brands.routes.js'
import CartRoutes from './routes/Cart.routes.js'
import UserRoutes from './routes/User.routes.js'
import OrderRoutes from './routes/Order.routes.js'
import AuthRoutes from './routes/Auth.routes.js'
import cors from 'cors'
import categoryRoutes from './routes/Category.routes.js'
dotenv.config({path:'./.env'})
const app=express()
app.use(express.json())
app.use(cors())

const port=process.env.PORT||4000;
app.use('/products',ProductRoutes)
app.use('/categories',categoryRoutes)
app.use('/brands',BrandRoutes)
app.use('/cart',CartRoutes)
app.use('/users',UserRoutes)
app.use('/auth',AuthRoutes)
app.use('/orders',OrderRoutes)



app.listen(port,()=>{
    console.log(`app is running currently on ${port}`)
})
connectDB()
