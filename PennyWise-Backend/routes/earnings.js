import express from "express";
import { addEarnings,getEarnings,getTotalEarnings, updateEarnings } from "../models/earnings.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

// router is used to add routes in seperate files improving structure and all
const router = express.Router()

// Route to add earnings

router.post("/earnings",authenticateToken, async(req,res)=>{
    try{
        const {amount,notes} = req.body;
        const userID = req.user.id;
        const newEarnings = await addEarnings(amount,notes,userID);
        res.status(201).json(newEarnings);

    } catch(error){
        res.status(500).json({message:"Error adding earnings",error})

    }
});

// route to get new earnings

router.get("/earnings",authenticateToken,async(req,res)=>{
    try{
        const userID = req.user.id;
        const totalEarnings= await getTotalEarnings(userID);
        const earnings = await getEarnings(userID);
        res.status(200).json({earnings,totalEarnings});
    }catch (error){
        res.status(500).json({message : "error fetching earnings",error});
    
    }
});

router.put("/earnings/:id" , authenticateToken , async(req,res)=>{
    try {
        const {id} = req.params;
        const {amount , notes} = req.body;
        const userID= req.user.id;

        const result = await updateEarnings(amount,notes,id,userID);
        if(result.rowCount === 0){
            return res.status(404).json({message:"Earnings not found or unauthorized"});

        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({message:"Error updating earnings"});
        
    }
})

export default router;
