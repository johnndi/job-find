import express from "express";
import jobroute from "./routes/job.routes.js";
import employerroute from "./routes/employer.routes.js";
import employeeroute from "./routes/employee.routes.js";
import logroute from "./routes/login.routes.js";
import {config} from "dotenv"
import cors from "cors";
 
const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    methods:["POST", "GET", "DELETE" , "PATCH"],
    credentials:true
}))
app.use(express.json());
config();
app.use(express.urlencoded({extended:true}))
app.use("/job", jobroute)
app.use("/employer", employerroute)
app.use("/employee",employeeroute)
app.use("/user", logroute)
app.listen(4002, ()=>{
    console.log("localhost running on port 4002...")
});