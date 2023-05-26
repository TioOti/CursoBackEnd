import { Router } from 'express';
import * as ViewsController from '../controllers/view.controller.js';
import * as GithubController from '../controllers/github.controller.js';
import { ADMIN, PREMIUM, USER } from '../constants/constants.js';
import { auth } from '../middleware/authToken.middleware.js';
import { handleRolesForView } from '../middleware/roles.middleware.js';

const viewsRouter = Router();

viewsRouter.get("/products", auth, ViewsController.renderHome);
viewsRouter.get("/carts/:cid", auth, ViewsController.getCart);
viewsRouter.post("/carts/:cid/products/:pid", auth, handleRolesForView([USER, PREMIUM]), ViewsController.addProductToCart);
viewsRouter.get("/carts/:cid/purchase", auth, handleRolesForView([USER, PREMIUM]), ViewsController.purchase);
viewsRouter.get("/carts/:cid/products/:pid", auth, handleRolesForView([USER, PREMIUM]), ViewsController.deleteProductFromCart);
viewsRouter.get("/login", ViewsController.login);
viewsRouter.post("/login", ViewsController.login);
viewsRouter.get("/logout", ViewsController.logout);
viewsRouter.get("/register", ViewsController.register);
viewsRouter.get("/userManagement", auth, handleRolesForView([ADMIN]), ViewsController.userManagement);
viewsRouter.get("/userSearch", auth, handleRolesForView([ADMIN]), ViewsController.findUser);
viewsRouter.get("/changeRole", auth, handleRolesForView([ADMIN]), ViewsController.changeRole);
viewsRouter.get("/userDelete", auth, handleRolesForView([ADMIN]), ViewsController.deleteUser);
viewsRouter.post("/register", ViewsController.createUser);
viewsRouter.get("/passwordRecovery", ViewsController.passwordRecovery);
viewsRouter.post("/passwordRecovery", ViewsController.passwordRecoveryEmail);
viewsRouter.post("/updatePassword/:email", ViewsController.updatePassword);
viewsRouter.get('/github/fail', GithubController.renderFailure);

export default viewsRouter;