import express from 'express';
import authUser from '../middlewares/authUser.js'
import { getAllOrders, getUserOrders, placeOnline, placeOrder } from '../controller/orderController.js';
import authSeller from '../middlewares/authSeller.js'

const orderRoute= express.Router();

orderRoute.post('/cod',authUser,placeOrder)
orderRoute.get('/user',authUser,getUserOrders)
orderRoute.get('/seller',authSeller,getAllOrders)

orderRoute.post('/stripe',authUser,placeOnline)


export default orderRoute;