import { Router } from 'express';
import { auth } from '../middleware/authToken.middleware.js'
import * as ViewsController from '../controllers/view.controller.js'
import * as GithubController from '../controllers/github.controller.js'

const viewsRouter = Router();

viewsRouter.get("/products", auth, ViewsController.renderHome);
viewsRouter.get("/carts/:cid", auth, ViewsController.getCart);
viewsRouter.get("/login", ViewsController.login);
viewsRouter.post("/login", ViewsController.login);
viewsRouter.get("/logout", ViewsController.logout);
viewsRouter.get("/register", ViewsController.register);
viewsRouter.post("/register", ViewsController.createUser);
viewsRouter.get("/passwordRecovery", ViewsController.passwordRecovery);
viewsRouter.post("/updatePassword/:email", ViewsController.updatePassword);
viewsRouter.get('/github/fail', GithubController.renderFailure);

export default viewsRouter;