import express from "express";
import {
    registerController,
    loginController,
    updateController,
    logoutController,
} from "../controllers/user.controller";
import { authmiddleware } from "../middleware/auth.middleware";

const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);

router.put("/update/:id", authmiddleware, updateController);
router.post("/logout", authmiddleware, logoutController);

export default router;