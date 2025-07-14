import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config'
import userRouter from './routes/userRoute.js';
import sellerRoute from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloud.js';
import productRoute from './routes/productRoute.js';
import cartRoute from './routes/cartRoute.js';
import addressRoute from './routes/adressRoute.js';
import orderRoute from './routes/orderRoute.js';
import { stripeWebhooks } from './controller/orderController.js';


const port=process.env.PORT || 4000 ;
await connectDB();
await connectCloudinary();

const orginform=["http://localhost:5173"]

const app=express();
app.post('/stripe',express.raw({type:'application/json'}),stripeWebhooks)

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:orginform ,credentials:true}));



app.get("/" ,(req,res)=>{
    res.send("app is working")
});
app.use('/api/user',userRouter)
app.use('/api/seller',sellerRoute)
app.use('/api/product',productRoute)
app.use('/api/cart',cartRoute)
app.use('/api/address',addressRoute)
app.use('/api/order',orderRoute)



app.listen(port,()=>{
    console.log(`server is running: ${port}`)
})
