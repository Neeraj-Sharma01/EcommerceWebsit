import express from 'express'

import {requireSignIn,isAdmin} from '../middleware/authMiddleware.js'
import { createProductController,deleteProductController,getProducteController, getSingleProducteController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable'

const router = express.Router();

//routes
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

//Update Product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

//get Product
router.get('/get-product',getProducteController)

//get Single Product
router.get('/get-product/:slug',getSingleProducteController)

//get photo
router.get('/product-photo/:pid',productPhotoController)

//delete Product
router.delete('/delete-product/:pid',deleteProductController)

//filter product
router.post('/product-filter',productFiltersController)

//product count
router.get('/product-count',productCountController)

//product per page
router.get('/product-list/:page',productListController)

//search product
router.get('/search/:keyword',searchProductController)

//similler Product
router.get('/related-product/:pid/:cid',relatedProductController)

//category wise product
router.get('/product-category/:slug',productCategoryController)

export default router