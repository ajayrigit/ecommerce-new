import { addProduct, changeStock, productById, productList } from "../controller/productController.js";
import express from 'express';
import { upload } from "../configs/multer.js";
import authSeller from "../middlewares/authSeller.js";

const productRoute= express.Router();

productRoute.post('/addproduct',upload.array(["images"]),authSeller,addProduct);
productRoute.get('/productlist',productList);
productRoute.get('/productid', productById);
productRoute.post('/stock',authSeller,changeStock);


export default productRoute;