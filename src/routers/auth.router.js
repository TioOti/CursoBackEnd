import { Router } from "express";
import * as AuthController from "../controllers/auth.controller.js"

const router = new Router();

router.post("/login", AuthController.apilogin);
router.get("/logout", AuthController.apilogout);

export default router;

