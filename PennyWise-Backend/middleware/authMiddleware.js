import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateToken=(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try {
        const user = jwt.verify(token,process.env.JWT_SECRET);
        req.user=user; 
        console.log(user);
        next();
    } catch (error) {
        res.status(403).json({message:"Invalid or expired token"});
        
    } 
};

export default authenticateToken;