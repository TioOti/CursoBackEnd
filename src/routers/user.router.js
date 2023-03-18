import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";
import { apiAuth } from '../middleware/authToken.middleware.js'

const router = new Router();

router.post("/", UserController.createUser);
router.get("/:email", apiAuth, UserController.getUser);

export default router;