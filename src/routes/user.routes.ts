import express from "express";
import {
    registerController,
    loginController,
    updateController,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.put("/update/:id", updateController);

export default router;
