import ProductManager from "../ProductManager.js";
import { Router } from "express";

const productsRouter = Router()

let productManager = new ProductManager();


productsRouter.get("/", (req, res) => {
    const { limit } = req.query;
    let products = productManager.getProducts()
    if(limit && limit>0 && limit< products.length){
        products = products.splice(0, limit);
    }

    res.status(200).json(products);
})

productsRouter.get("/:pid", (req, res) => {
    const { pid } = req.params;    
    let response = productManager.getProductById(Number(pid));
    res.status(response.status).json(response.detail)

});

productsRouter.post('/', (req,res) =>{
    const productAdded = req.body;
    const response = productManager.addProduct(productAdded)
    res.status(response.status).json(response.detail)

})

productsRouter.put('/:pid', (req,res) =>{
    const { pid } = req.params;
    const productToUpdate = req.body;
    const response = productManager.updateProducts(Number(pid), productToUpdate)
    res.status(response.status).json(response.detail)
})

productsRouter.delete('/:pid', (req,res) =>{
    const { pid } = req.params;
    const response = productManager.deleteProduct(Number(pid))
    res.status(response.status).json(response.detail)

})



export default productsRouter;
