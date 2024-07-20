import { Router } from "express";
import {
  getoneemployee,
  postsemployee,
  deletesemployee,
} from "../controllers/employees.controllers.js";

const router = Router();

router
  .get("/:id", getoneemployee)
  .post("/", postsemployee)
  .delete("/:id", deletesemployee);
export default router;
