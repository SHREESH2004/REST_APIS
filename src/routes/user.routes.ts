import e from "express";
import { createUserController } from "../controllers/user.controller";

const Router=e.Router();

Router.post('/signup',createUserController);

export default Router;