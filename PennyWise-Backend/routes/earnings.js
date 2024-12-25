import express from "express";
import { addEarnings,getTotalEarnings } from "../models/earnings.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

// router is used to add routes in seperate files improving structure and all
const router = express.Router()

// Route to add earnings

router.post("/earnings",authenticateToken, async(req,res)=>{
    try{
        const {amount} = req.body;
        const newEarnings = await addEarnings(amount);
        res.status(201).json(newEarnings);

    } catch(error){
        res.status(500).json({message:"Error adding earnings",error})

    }
});

// route to get new earnings

router.get("/earnings",authenticateToken,async(req,res)=>{
    try{
        const totalEarnings= await getTotalEarnings();
        res.status(200).json({totalEarnings});
    }catch (error){
        res.status(500).json({message : "error fetching earnings",error});
    
    }
});

export default router;
