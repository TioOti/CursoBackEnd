import * as ProductController from '../controllers/product.controller.js'
import { adminRole } from '../middleware/roles.middleware.js'
import passport from 'passport';
import CustomError from '../utils/customError.js';
import { ERRORS } from '../constants/errors.js';
import { Router }  from "express";

const ProductsRouter = Router();

ProductsRouter.get("/unauthenticated", () => { throw CustomError.createError(ERRORS.MISSING_INVALID_TOKEN) });
ProductsRouter.get("/", ProductController.getProducts);
ProductsRouter.get("/:pid", ProductController.getProduct);
ProductsRouter.post("/", passport.authenticate('current', { session: false, failureRedirect: '/api/products/unauthenticated' }), 
                            adminRole, ProductController.addProduct);
ProductsRouter.put("/:pid", passport.authenticate('current', { session: false, failureRedirect: '/api/products/unauthenticated' }), 
                            adminRole, ProductController.updateProduct);
ProductsRouter.delete("/:pid", passport.authenticate('current', { session: false, failureRedirect: '/api/products/unauthenticated' }), 
                            adminRole, ProductController.deleteProduct);

export default ProductsRouter;