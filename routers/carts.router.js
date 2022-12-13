import { Router } from "express";
import CartManager from "../src/Cart/CartManager.js";

const cartsRouter = Router();
const cartManager = new CartManager();


cartsRouter.post("/", (req, res) => {

    const products = req.body;
    const response = cartManager.createCart(products)
    res.status(response.status).json(response.detail)

});

cartsRouter.get("/:cid", (req, res) =>{
    const {cid} = req.params;
    const response = cartManager.getCart(Number(cid));
    res.status(response.status).json(response.detail);
});

cartsRouter.post("/:cid/product/:pid", (req, res) =>{
    const { cid, pid } = req.params;
    const response = cartManager.addProductToCart(Number(cid), Number(pid));
    res.status(response.status).json(response.detail);
})



export default cartsRouter;
