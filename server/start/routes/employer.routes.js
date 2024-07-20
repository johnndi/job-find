import { Router } from "express";
import {
  getoneemployer,
  deletesemployer,
  postsemployer,
} from "../controllers/employer.controller.js";


const router = Router();

router
  .get("/:id",getoneemployer)
  .post("/", postsemployer)
  .delete("/:id", deletesemployer);
export default router;
