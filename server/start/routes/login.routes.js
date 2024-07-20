import { Router } from "express";
import { user } from "../controllers/login.controller.js";

const router = Router();

router.post("/", user);
export default router;
