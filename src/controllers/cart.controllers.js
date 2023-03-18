import factory from '../services/factory.js';
import * as Constants from '../constants/constants.js'

export async function getCarts(req, res){
    try {
        const carts = await factory.cart.getCarts();
        if(!carts || carts.length == 0){
            res.status(404).json({
                message: Constants.CARTS_NOT_FOUND,
                status: Constants.STATUS.FAILED
            });
        } else{
            res.json({
                carts,
                status: Constants.STATUS.SUCCESS
            })
        };
    } catch (error) {
        res.status(500).json({
            error: error.message,
            status: Constants.STATUS.FAILED
        })
    }
}

export async function getCart(req, res){
    try{
        const { cid } = req.params;
        const cart = await factory.cart.getCart(cid);
        if (!cart){
            res.status(404).json({
                message: Constants.CART_NOT_FOUND,
                status: Constants.STATUS.FAILED
            });
        }else{
            res.json({
                cart,
                status: Constants.STATUS.SUCCESS
            }); 
        }
    } catch (error){
        res.status(400).json({
            error: error.message,
            status: Constants.STATUS.FAILED
        });
    }
}

export async function createCart(req, res){
    try {
        const { body } = req;
        const cart = await factory.cart.createCart(body);
        res.status(201).json({
            cart,
            status: Constants.STATUS.SUCCESS
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: Constants.STATUS.FAILED
        });
    }
}

export async function addProductToCart(req, res){
    try {
        const { cid, pid } = req.params;
        const cart = await factory.cart.addProductToCart(cid, pid);
        if (!cart){
            res.status(404).json({
                message: Constants.CART_NOT_FOUND,
                status: Constants.STATUS.FAILED
            });
        } else {
            res.json({
                cart,
                status: Constants.STATUS.SUCCESS
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: Constants.STATUS.FAILED
        });
    }
}

export async function updateProductQty(req, res){
    try {
        const { cid, pid } = req.params;
        const { body } = req;
        const cart = await factory.cart.updateProductQty(cid, pid, body.quantity);
        if (!cart){
            res.status(404).json({
                message: Constants.CART_NOT_FOUND,
                status: Constants.STATUS.FAILED
            });
        } else {
            res.json({
                cart,
                status: Constants.STATUS.SUCCESS
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: Constants.STATUS.FAILED
        });
    }
}

export async function updateCart(req, res){
    try {
        const { cid } = req.params;
        const { body } = req;
        const response = await factory.cart.updateCart(cid, body);
        if (!response){
            res.status(404).json({
                message: Constants.CART_NOT_FOUND,
                status: STATUS.FAILED
            });
        } else {
            res.json({
                cart: response,
                status: Constants.STATUS.SUCCESS
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: Constants.STATUS.FAILED
        });
    }
}

export async function deleteProduct(req, res){
    try {
        const { cid, pid } = req.params;
        const cart = await factory.cart.deleteProduct(cid, pid);
        if (!cart){
            res.status(404).json({
                message: Constants.CART_NOT_FOUND,
                status: STATUS.FAILED
            });
        } else {
            res.json({
                cart,
                status: Constants.STATUS.SUCCESS
            });
        }cart
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: Constants.STATUS.FAILED
        });
    }
}

export async function deleteProducts(req, res){
    try {
        const { cid } = req.params;
        const cart = await factory.cart.deleteProducts(cid);
        if (!cart){
            res.status(404).json({
                message: Constants.CART_NOT_FOUND,
                status: Constants.STATUS.FAILED
            });
        } else {
            res.json({
                cart,
                status: Constants.STATUS.SUCCESS
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: Constants.STATUS.FAILED
        });
    }
}

export async function purchase(req, res){
    try {
        const { cid } = req.params;
        const cart = await factory.cart.getCart(cid);
        if (!cart){
            res.status(404).json({
                message: Constants.CART_NOT_FOUND,
                status: Constants.STATUS.FAILED
            });
        } else {
            let amount = 0;
            let unprocessedProducts = [];
            cart.products.forEach( cartItem => {
                if(cartItem.quantity <= cartItem.product.stock){
                    factory.product.updateProduct(cartItem.product.id, {"stock": cartItem.product.stock - cartItem.quantity});
                    amount += cartItem.product.price;
                    factory.cart.deleteProduct(cid, cartItem.product.id);
                } else {
                    unprocessedProducts.push(cartItem.product.id);
                }
            });
            const ticket = await factory.ticket.createTicket({ "amount": amount, "purchaser": req.user.email});
            res.json({
                ticket,
                unprocessedProducts,
                status: Constants.STATUS.SUCCESS
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            status: Constants.STATUS.FAILED
        });
    }
}