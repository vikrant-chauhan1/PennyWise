import express from "express";
import jwt from "jsonwebtoken";
import { registerUser,authenticateUser } from "../models/auth.js";


const router = express.Router();
const JWT_SECRET= process.env.JWT_SECRET;

// user registration route

router.post("/register",async(req,res)=>{
    const {email,password}= req.body;

    if(!email || !password || !email.includes("@") || password.length < 6){
        return res.status(400).json({message:"Email and password are required"});
    } 

    try {
        const user= await registerUser(email,password);
        res.status(201).json({message:"User registered successfully",user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error registering user.",error})
        
    }
});

// user login route

router.post("/login", async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"Email and password are required"});

    }
    try {
        const user = await authenticateUser(email,password);
        if(!user){
            return res.status(401).json({message:"Invalid email or password"});

        }
        const token = jwt.sign({id:user.id,email:user.email},JWT_SECRET,{expiresIn:"1h"});
        res.status(200).json({message:"Login Successfull",token});
    } catch (error) {
        res.status(500).json({message:"Error Loading In",error});

    }


});

export default router;