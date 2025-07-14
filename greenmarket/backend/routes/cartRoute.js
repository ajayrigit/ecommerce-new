import { cartController } from "../controller/cartController.js";
import express from 'express';
import authUser from "../middlewares/authUser.js";


const cartRoute = express.Router();

cartRoute.post('/update',authUser,cartController);

export default cartRoute;