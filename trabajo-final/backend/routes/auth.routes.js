import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import validateUser from "../middlewares/validateUser.middleware.js";

const router = Router();

router.post("/register", validateUser, authController.register);
router.post("/login", authController.login);
router.get("/profile", authenticate, authController.profile);

export default router;
