import * as ProductController from '../controllers/product.controller.js'
import { adminRole } from '../middleware/roles.middleware.js'
import passport from 'passport';
import * as Constants from '../constants/constants.js'
import { Router }  from "express";

const ProductsRouter = Router();

ProductsRouter.get("/unauthenticated", (req, res) => {
    res.status(401).json({
        message: Constants.MISSING_INVALID_TOKEN,
        status: Constants.STATUS.FAILED
    });
});

ProductsRouter.get("/", ProductController.getProducts);
ProductsRouter.get("/:pid", ProductController.getProduct);
ProductsRouter.post("/", passport.authenticate('current', { session: false, failureRedirect: '/api/products/unauthenticated' }), 
                            adminRole, ProductController.addProduct);
                            ProductsRouter.put("/:pid", passport.authenticate('current', { session: false, failureRedirect: '/api/products/unauthenticated' }), 
                            adminRole, ProductController.updateProduct);
                            ProductsRouter.delete("/:pid", passport.authenticate('current', { session: false, failureRedirect: '/api/products/unauthenticated' }), 
                            adminRole, ProductController.deleteProduct);


export default ProductsRouter;