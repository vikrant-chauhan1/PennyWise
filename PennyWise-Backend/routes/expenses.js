import express from "express";
import { getExpenses,addExpenses } from "../models/expenses.js";
import authenticateToken from "../middleware/authMiddleware.js";
import { deleteExpenseById } from "../models/expenses.js";

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


router.delete("/expenses/:id",authenticateToken , async(req,res)=>{
    try {
        const userID = req.user.id;
        const {id} = req.params;
        const response = await deleteExpenseById(id,userID);
        if (response.rowCount === 0) {
            return res.status(404).json({ message: "Expense not found or unauthorized" });
        }
        res.status(200).json({message:"Expense Deleted successfully"});
       

    } catch (error) {
        console.error("error deleting the expense", error);
        res.status(500).json({message:"Error deleting the expense",error});
        
    }
});

export default router;