import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";
import { apiAuth } from '../middleware/authToken.middleware.js'

const router = new Router();

router.post("/", UserController.createUser);
router.put("/:email", apiAuth, UserController.updateUser);
router.put("/password/:email", apiAuth, UserController.updatePassword);

export default router;