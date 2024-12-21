import express from "express";
import { getExpenses,addExpenses } from "../models/expenses.js";

const router = express.Router();

// route to add expense

router.post("/expenses",async(req,res)=>{
    try {
        const {amount,category,notes}= req.body;
        const newExpense = await addExpenses(amount,category,notes);
        res.status(200).json({newExpense});
        
    } catch (error) {
        res.status(500).json({message: "Error adding expenses", error});
        
    }
});


// route to get all the expenses

router.get("/expenses", async(req,res)=>{
    try {
        const expenses = await getExpenses();
        res.status(200).json({expenses});
    } catch (error) {
        res.status(500).json({message:"Error fetching expenses"})
        
    }
});
export default router;