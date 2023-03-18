import { CartModel } from '../../models/cart.model.js';

export async function getCarts(){
    try {
        const carts = await CartModel.find({ deletedAt: { $exists: false } });
        return carts;
    } catch (error) {
       throw new Error(error.message);
    }
}

export async function getCart(cartId){
    try {
        const cart = await CartModel.findById({ _id: cartId }).populate("products.product").lean();
        return cart;
    } catch (error) {
       throw new Error(error.message);
    }
}

export async function createCart(data){
    try {
        const cart = await CartModel.create(data);
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function addProductToCart(cartId, productId){
    try {
        const cart = await CartModel.findById(cartId);
        if (cart) {
            const productToUpdate = cart.products.find(product => product.product == productId);
            if (productToUpdate){
                productToUpdate.quantity = productToUpdate.quantity + 1;
            } else{
                cart._doc.products.push({product: productId});
            }
            await CartModel.findByIdAndUpdate(cartId, cart, { new: true });
        }
        return cart;
    } catch (error) {
       throw new Error(error.message);
    }
}

export async function updateProductQty(cartId, productId, quantity){
    try {
        const cart = await CartModel.findById(cartId);
        if (cart) {
            const productToUpdate = cart.products.find(product => product.product == productId);
            if (productToUpdate){
                productToUpdate.quantity = quantity;
            } else{
                cart.products.push({product: productId, quantity: quantity});
            }
            await CartModel.findByIdAndUpdate(cartId, cart, { new: true });
        }
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updateCart(cartId, data){
    try {
        const cart = await CartModel.findById(cartId);
        if(cart){
            cart._doc.products = data.products;
            await CartModel.findByIdAndUpdate(cartId, cart, { new: true });
        }
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteProduct(cartId, productId){
    try {
        const cart = await CartModel.findById(cartId);
        if (cart) {
            cart._doc.products = cart.products.filter(cartItem => cartItem.product != productId.toString());
            await CartModel.findByIdAndUpdate(cartId, cart, { new: true });
        }
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteProducts(cartId){
    try {
        const cart = await CartModel.findById(cartId);
        if(cart){
            cart._doc.products = [];
            await CartModel.findByIdAndUpdate(cartId, cart, { new: true });
        }
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}