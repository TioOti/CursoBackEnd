const fs = require ("fs");
const { parse } = require("path");


class ProductManager {
    constructor() {
        this.products = [];
        this.path = "products.json"
    }

    
   

    addProduct(productAdded){ //Recibo un object
        const {title, description, price, thumbnail, code, stock} = productAdded 
        if(!title || !description || (price !== 0 && !price) || !thumbnail || !code || (stock !== 0 && !stock)){
            console.log("All the attributes are required.");
            return "All the attributes are required.";
        }   

        this.#readProducts();
        
        const codeExist = this.products.find(product => product.code === code);
        if (codeExist){
            console.log("The code already exist.");
            return "The code already exist.";
        }
        
        const product = {
            id: this.#getMaxId() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };


        

        this.products.push(product);
        this.#writeProducts(this.products)

        
        
    }

    getProducts(){
        this.#readProducts();
        console.log(this.products);
        return this.products;
    }

    getProductById(productId){
        this.#readProducts()
        const productById = this.products.find(product => product.id === productId);
        return console.log(productById || "THIS PRODUCT DOESNT EXIST");
    }

    #getMaxId() {
        let maxId = 0;
        this.products.map((product) => {
            if (product.id > maxId) maxId = product.id;
        });
        return maxId;
    }
    
    #readProducts () {
        if (fs.existsSync(this.path)) {
            this.products = JSON.parse(fs.readFileSync(this.path),"utf-8");
        }
    }

    #writeProducts (productJson){
        try {
            const productsToWrite = JSON.stringify(productJson, null, 2)
            fs.writeFileSync(this.path, productsToWrite)
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    updateProducts (id, objectToUpdate) {
        this.#readProducts()
        const productById = this.getProductById(id)
        if(productById !== "THIS PRODUCT DOESNT EXIST"){
            const productToUpdate = {
                id: id,
                ...objectToUpdate
            }
            this.products = this.products.filter(product => product.id !== id)
            this.products.push(productToUpdate)
            this.#writeProducts(this.products)
            return console.log("Update Successfuly")
        }
        return console.log(productById);
    }

    deleteProduct(productId) {
        const productToDelete = this.getProductById(productId);
        if(productToDelete !== "THIS PRODUCT DOESNT EXIST"){
            this.products = this.products.filter(product => product.id !== productId)
            this.#writeProducts(this.products);
            return console.log("Product Deleted")
        }
        return console.log(productToDelete)
    }

}


const testProduct1 = {
    title: "Producto prueba", 
    description: "Este es un producto prueba", 
    price: 200, 
    thumbnail: "Sin imagen",
    code:"abc123",
    stock: 25
}
const testProduct2 = {
    title: "Producto prueba n°2", 
    description: "Este es un producto prueba", 
    price: 200, 
    thumbnail: "Sin imagen",
    code:"abc124",
    stock: 25
}
const testProduct3 = {
    title: "Producto prueba n°3", 
    description: "Este es un producto prueba", 
    price: 200, 
    thumbnail: "Sin imagen",
    code:"abc125",
    stock: 25
}

const testProduct4 = {
    title: "Producto prueba updated", 
    description: "Este es un producto prueba", 
    price: 200, 
    thumbnail: "Sin imagen",
    code:"abc126",
    stock: 25
}



const productManager = new ProductManager();
productManager.getProducts();
productManager.addProduct(testProduct1);
productManager.addProduct(testProduct2);
productManager.addProduct(testProduct3);
productManager.addProduct(testProduct4);
productManager.getProducts();
productManager.getProductById(1);
productManager.getProductById(5);
productManager.updateProducts(2, testProduct3 )
productManager.deleteProduct(4)
productManager.getProducts()






