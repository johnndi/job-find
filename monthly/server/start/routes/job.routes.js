import { Router } from "express";
import { getall,getone,posts,updates,deletes,getones } from "../controllers/job.controller.js";
// import verify from "../middlewares/jwt.middlewares.js";


const router = Router();
 
router.get("/", getall).post( "/", getone).post( "/", getones).post( "/", posts).patch("/:field", updates).delete("/:id", deletes)

export default router;