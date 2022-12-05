import express from "express";
import ProductManager from "./ProductManager.js";


const app = express();
app.use(express.urlencoded({ extended:true }));
app.listen(8080, ()=> console.log("Server open from Back End ! "));
app.on("error", (error) => console.log(error))

let productManager = new ProductManager();

/* app.get("/hello", req, res) => {
    res.send("<h1> Server from BackEnd deployed ! </h1>")
} */

app.get("/products", (req, res) => {
    const { limit } = req.query;
    let products = productManager.getProducts()
    if(limit && limit>0 && limit< products.length){
        products = products.splice(0, limit);
    }

    res.status(200).json(products);
})

app.get("/products/:pid", (req, res) => {
    const { pid } = req.params;    
    let products = productManager.getProductById(Number(pid));
    products == "THIS PRODUCT DOESNT EXIST" ? 
        res.status(404).json({msjError: products}) :
        res.status(200).json(products);

});
