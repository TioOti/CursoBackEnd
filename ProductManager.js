import fs from "fs";

class ProductManager {
    constructor() {
        this.products = [];
        this.path = "src/products.json"
    }

    addProduct(productAdded){ //Recibo un object
        const {title, description, price, thumbnails, code, stock} = productAdded 
        if(!title || !description || (price !== 0 && !price) || !code || (stock !== 0 && !stock)){
            console.log("All the attributes are required.");
            return {status: 400, detail: { message:"All the attributes are required."}}
        }   

        this.#readProducts();
        
        const codeExist = this.products.find(product => product.code === code);
        if (codeExist){
            console.log("The code already exist.");
            return {status: 400, detail: { message:"The code already exist."}}
        }
        
        const product = {
            id: this.#getMaxId() + 1,
            title,
            description,
            price,
            status: true,
            thumbnails,
            code,
            stock
        };

        this.products.push(product);
        this.#writeProducts(this.products)
        return {status: 201, detail: { message:"Product Added! "}}

        

    }

    getProducts(){
        this.#readProducts();
        console.log(this.products);
        return this.products;
    }

    getProductById(productId){
        this.#readProducts()
        const productById = this.products.find(product => product.id === productId);
        const result = productById || "THIS PRODUCT DOESNT EXIST";
        console.log(result);
        return result == "THIS PRODUCT DOESNT EXIST" ? 
        {status:404 , detail: {message: result}}:
        {status:200 , detail: result}
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
        if(productById.status !== 404){
            const productToUpdate = {
                id: id,
                ...objectToUpdate
            }
            this.products = this.products.filter(product => product.id !== id)
            this.products.push(productToUpdate)
            this.#writeProducts(this.products)
            return {status: 200, detail: { message:"Update Successfuly"}}
        }
        return {status:404 , detail: {message: "THIS PRODUCT DOESNT EXIST"}};

    }

    deleteProduct(productId) {
        const productToDelete = this.getProductById(productId);
        if(productToDelete.status !== 404){
            this.products = this.products.filter(product => product.id !== productId)
            this.#writeProducts(this.products);
            console.log("Product Deleted")
            return {status: 200, detail: { message:"Product Deleted"}}
        }
        console.log(productToDelete)
        return {status:404 , detail: {message: "Product doesn't exists"}}
    }

}

export default ProductManager;



/* productManager.getProducts();
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

*/

