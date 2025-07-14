import express from 'express'
import { isSeller, sellerLogin, sellerLogout } from '../controller/sellerController.js';
import authSeller from '../middlewares/authSeller.js';


const sellerRoute= express.Router();

sellerRoute.post('/login',sellerLogin)
sellerRoute.get('/seller-auth',authSeller,isSeller)
sellerRoute.get('/logout',authSeller,sellerLogout)


export  default sellerRoute;