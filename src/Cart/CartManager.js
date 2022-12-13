import fs from 'fs'

const CART_NOT_EXIST = "This id doesn't match with any id in the DB"

class CartManager{
    constructor() {
        this.carts = []
        this.path = './src/Cart/Carts.json'
        
    }


    createCart(productsInput){

        const {products} = productsInput

        this.#readCarts();

        const cart = {
            id: this.#getMaxId() + 1,
            products
        }

        this.carts.push(cart)
        this.#writeCarts(this.carts)
        return {status: 201, detail: { message:"Cart added"}}
    }

    #getMaxId() {
        let maxId = 0;
        this.carts.map((cart) => {
            if (cart.id > maxId) maxId = cart.id;
        });
        return maxId;
    }

    getCart(cartId){
        this.#readCarts();
        const cartById = this.carts.find(cart => cart.id ===cartId);
        const result = cartById || CART_NOT_EXIST;
        return result  !== CART_NOT_EXIST?
        {status: 200, detail:{products: result.products}} :
        {status: 404, detail:{ message: CART_NOT_EXIST }}
    }

    addProductToCart(cartId, productId){
        this.#readCarts();
        const cartById = this.carts.find(cart => cart.id === cartId);
        const result = cartById || CART_NOT_EXIST;
        if(result == CART_NOT_EXIST){
            return { status: 404,  detail: { message: CART_NOT_EXIST }};
        }
        let productsArray = cartById.products;
        const productById = productsArray.find(product => product.product === productId);
        if(productById){
           const newProduct = {
                product: productById.product,
                quantity: productById.quantity + 1
           };
           productsArray = productsArray.filter(product => product.product !== productId);
           productsArray.push(newProduct);
        } else {
            productsArray.push({ product: productId, quantity: 1});
        }

        const newCart = {
            ...cartById,
            products: productsArray
        }
        this.carts = this.carts.filter(cart => cart.id !== cartId);
        this.carts.push(newCart);
        this.#writeCarts(this.carts);
        return { status: 200,  detail: { message: "Cart Updated!" }};
    }
    #readCarts () {
        if (fs.existsSync(this.path)) {
            this.carts = JSON.parse(fs.readFileSync(this.path),"utf-8");
        }
    }

    #writeCarts (productJson){
        try {
            const CartsToWrite = JSON.stringify(productJson, null, 2)
            fs.writeFileSync(this.path, CartsToWrite)
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}

export default CartManager;