import { adressController, getAddress } from "../controller/adressController.js";
import express from 'express';
import authUser from "../middlewares/authUser.js";

const addressRoute= express.Router();


addressRoute.post('/addaddress',authUser,adressController)
addressRoute.get('/getaddress',authUser,getAddress)


export default addressRoute