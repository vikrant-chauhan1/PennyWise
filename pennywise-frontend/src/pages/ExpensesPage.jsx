import React, { useState, useEffect } from "react";
import { TextField, Button, Snackbar, MenuItem } from "@mui/material";
import axios from "axios";
import "../css/components.css";
import "../css/global.css";

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }
        const response = await axios.get("https://pennywise-jabt.onrender.com/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(response.data.expenses || []);
      } catch (error) {
        console.error("Failed to fetch Expenses", error);
      }
    };
    fetchExpense();
  }, []);

  const handleAddExpense = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const response = await axios.post(
        "https://pennywise-jabt.onrender.com/expenses",
        { amount, category, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setExpenses((prev) => [response.data.newExpense, ...prev]);
      setSuccess(true);
      setAmount("");
      setCategory("");
      setNotes("");
    } catch (error) {
      setError("Failed to add expenses. Please try again.");
      console.log(error);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const handleDelete = async (expensesID) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://pennywise-jabt.onrender.com/expenses/${expensesID}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response.data.message);
      setExpenses((prev) => prev.filter((expense) => expense.id !== expensesID));
    } catch (error) {
      console.error("Error deleting expense", error);
    }
  };

  const totalExpensesForExpensePage = expenses.reduce(
    (acc, expense) => acc + parseFloat(expense.amount),
    0
  );

  return (
    <div className="body-div">
      <div className="expenses-card">
        <h1 style={{ color: "#8B4513" }}>EXPENSES</h1>
        <h3 className="amount">You Spent: ₹{totalExpensesForExpensePage.toFixed(2)}</h3>

        <h1 className="heading-gradient">Add Expenses</h1>

        <TextField
          label="Expense Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          sx={{
            marginBottom: "1rem",
            backgroundColor: "#f5f5f5",
            borderRadius: "5px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ccc" },
              "&:hover fieldset": { borderColor: "#888" },
              "&.Mui-focused fieldset": { borderColor: "#555" },
            },
            "& .MuiInputBase-input": { color: "#333" },
            "& .MuiInputLabel-root": { color: "#666" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#444" },
          }}
        />

        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          sx={{
            marginBottom: "1rem",
            backgroundColor: "#f5f5f5",
            borderRadius: "5px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ccc" },
              "&:hover fieldset": { borderColor: "#888" },
              "&.Mui-focused fieldset": { borderColor: "#555" },
            },
            "& .MuiInputBase-input": { color: "#333" },
            "& .MuiInputLabel-root": { color: "#666" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#444" },
          }}
        >
          <MenuItem value="Compulsory Spending">Compulsory</MenuItem>
          <MenuItem value="Miscellaneous Spending">Miscellaneous</MenuItem>
        </TextField>

        <TextField
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
          sx={{
            marginBottom: "1rem",
            backgroundColor: "#f5f5f5",
            borderRadius: "5px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ccc" },
              "&:hover fieldset": { borderColor: "#888" },
              "&.Mui-focused fieldset": { borderColor: "#555" },
            },
            "& .MuiInputBase-input": { color: "#333" },
            "& .MuiInputLabel-root": { color: "#666" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#444" },
          }}
        />

        <button onClick={handleAddExpense} className="button-expenses">
          Add Expense
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
          message="Expense added successfully"
        />

        <h3>All Expenses</h3>
        <ul className="interactive-list">
          {expenses.map((expense, index) => (
            <li key={index} className="interactive-list-item">
              <h3>
                ₹{expense.amount} - {expense.category} ({expense.notes})
              </h3>
              <Button onClick={() => handleDelete(expense.id)}>Delete</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpensesPage;
