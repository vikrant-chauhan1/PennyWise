import express from "express";
import { getExpenses,addExpenses } from "../models/expenses.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

// route to add expense

router.post("/expenses",authenticateToken, async(req,res)=>{
    try {
        const {amount,category,notes}= req.body;
        const userID = req.user.id;
        const newExpense = await addExpenses(amount,category,notes,userID);
        res.status(200).json({newExpense});
        
    } catch (error) {
        res.status(500).json({message: "Error adding expenses", error});
        
    }
});


// route to get all the expenses

router.get("/expenses", authenticateToken, async(req,res)=>{
    try {
        const userID = req.user.id;
        const expenses = await getExpenses(userID);
        res.status(200).json({expenses});
    } catch (error) {
        res.status(500).json({message:"Error fetching expenses"})
        
    }
});
export default router;