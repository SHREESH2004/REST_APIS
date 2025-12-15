import e from "express";
import { registerController } from "../controllers/user.controller";

const router=e.Router();

router.post("/register",registerController);

export default router;