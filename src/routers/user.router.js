import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";
import { apiAuth } from '../middleware/authToken.middleware.js'

const router = new Router();

router.get("/", UserController.getUsers);
router.post("/", UserController.createUser);
router.get("/:email", apiAuth, UserController.getUser);
router.get("/premium/:uid", apiAuth, UserController.changeRole);
router.put("/:email", apiAuth, UserController.updateUser);
router.put("/password/:email", apiAuth, UserController.updatePassword);
router.delete("/", UserController.deleteUsers);

export default router;