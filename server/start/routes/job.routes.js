import { Router } from "express";
import {
  getall,
  getone,
  posts,
  updates,
  deletes,
  getones,
} from "../controllers/job.controller.js";
import Verify from "../middlewares/jwt.middlewares.js";
import { apply } from "../controllers/job application.js";
const router = Router();

router
  .get("/", getall)
  .post("/:field", getone)
  .post("/:type/type", getones)
  .post("/",Verify, posts)
  .patch("/:field",Verify, updates)
  .delete("/:id",Verify, deletes)
  .get("/:apply",Verify, apply);
export default router;
