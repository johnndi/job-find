import jwt from "jsonwebtoken"
const Verify = (req, res, next)=>{
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json({sucess:false, message:"unauthorized"})
}
jwt.verify(token, process.env.JWT_SECRET,(error, decoded)=>{
if(errror)return res.status(401).json({sucess:false,message:"unauthorized"})
    req.employer=decoded;
    req.employee=decoded;
next();
})
export default verify