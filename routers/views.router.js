import { Router } from "express";
import ProductManager from "../ProductManager.js"

const viewsRouter = Router();

viewsRouter.get('/', (req, res)=>{
    let products = ProductManager.getProducts()
    res.render('home', { products });
})

viewsRouter.get('/realtimeproducts', (req, res)=>{
    let products = ProductManager.getProducts()
    res.render('realTimeProducts', { products });
})

export default viewsRouter;