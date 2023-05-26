import factory from '../services/factory.js';
import CustomError from '../utils/customError.js';
import { ERRORS } from '../constants/errors.js';
import * as Constants from '../constants/constants.js'

export async function getCarts(req, res, next){
    try {
        const carts = await factory.cart.getCarts();
        if (!carts || carts.length === 0) throw CustomError.createError(ERRORS.CARTS_NOT_FOUND, null, req.user?.email);
        res.json({
            carts: carts.cartList,
            status: Constants.STATUS.SUCCESS
        });
    } catch (error) {
        handleErrors(error, req, next);
    }
}

export async function getCart(req, res){
    try{
        const { cid } = req.params;
        const cart = await factory.cart.getCart(cid);
        if (!cart){
            throw CustomError.createError(ERRORS.CART_NOT_FOUND, null, req.user?.email);
        }else{
            res.json({
                cart,
                status: Constants.STATUS.SUCCESS
            }); 
        }
    }  catch (error) {
        handleErrors(error, req, next);
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
        next(CustomError.createError(ERRORS.UNHANDLED_ERROR, error.message, req.user?.email));
    }
}

export async function addProductToCart(req, res, next){
    try {
        const { cid, pid } = req.params;
        const product = await factory.product.getProduct(pid);
        if(!product) throw CustomError.createError(ERRORS.PRODUCT_NOT_FOUND, null, req.user?.email);
        if(product.owner !== ADMIN && product.owner === req.user?.id) throw CustomError.createError(ERRORS.PRODUCT_OWNERSHIP, null, req.user?.email);
        const cart = await factory.cart.addProductToCart(cid, pid);
        if (!cart) throw CustomError.createError(ERRORS.CART_NOT_FOUND, null, req.user?.email);
        res.json({
            cart,
            status: STATUS.SUCCESS
        });
    } catch (error) {
        handleErrors(error, req, next);
    }
}

export async function updateProductQty(req, res, next){
    try {
        const { cid, pid } = req.params;
        const { body } = req;
        const cart = await factory.cart.updateProductQty(cid, pid, body.quantity);
        if (!cart) throw CustomError.createError(ERRORS.CART_NOT_FOUND, null, req.user?.email);
        res.json({
            cart,
            status: STATUS.SUCCESS
        });
    } catch (error) {
        handleErrors(error, req, next);
    }
}

export async function updateCart(req, res, next){
    try {
        const { cid } = req.params;
        const { body } = req;
        const cart = await factory.cart.updateCart(cid, body);
        if (!cart) throw CustomError.createError(ERRORS.CART_NOT_FOUND, null, req.user?.email);
        res.json({
            cart,
            status: STATUS.SUCCESS
        });
    } catch (error) {
        handleErrors(error, req, next);
    }
}

export async function deleteProduct(req, res, next){
    try {
        const { cid, pid } = req.params;
        const cart = await factory.cart.deleteProduct(cid, pid);
        if (!cart) throw CustomError.createError(ERRORS.CART_NOT_FOUND, null, req.user?.email);
        res.json({
            cart,
            status: STATUS.SUCCESS
        });
    } catch (error) {
        handleErrors(error, req, next);
    }
}

export async function deleteProducts(req, res, next){
    try {
        const { cid } = req.params;
        const cart = await factory.cart.deleteProducts(cid);
        if (!cart) throw CustomError.createError(ERRORS.CART_NOT_FOUND, null, req.user?.email);
        res.status(204).send();
    } catch (error) {
        handleErrors(error, req, next);
    }
}

export async function purchase(req, res, next){
    try {
        const { cid } = req.params;
        const cart = await factory.cart.getCart(cid);
        if (!cart) throw CustomError.createError(ERRORS.CART_NOT_FOUND, null, req.user?.email);
        let amount = 0;
        let unprocessedProducts = [];
        cart.products.forEach( async cartItem => {
            if(cartItem.quantity <= cartItem.product.stock){
                await factory.product.updateProduct(cartItem.product.id, {"stock": cartItem.product.stock - cartItem.quantity});
                amount += cartItem.product.price;
            } else {
                unprocessedProducts.push({ product: cartItem.product.id, quantity: cartItem.quantity });
            }
        });

        if(unprocessedProducts.length == 0){
            await factory.cart.deleteProducts(cid);
        } else await factory.cart.updateCart(cid, { products: unprocessedProducts });

        const ticket = await factory.ticket.createTicket({ "amount": amount, "purchaser": req.user.email});
        res.json({
            ticket,
            unprocessedProducts,
            status: STATUS.SUCCESS
        });
    } catch (error) {
        handleErrors(error, req, next);
    }
}
function handleErrors(error, req, next){
    if(!error.code) next(CustomError.createError(ERRORS.UNHANDLED_ERROR, error.message, req.user?.email)); else next(error);
};