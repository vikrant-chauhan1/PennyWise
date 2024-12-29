import React,{useState,useEffect} from 'react';
import { TextField,Button,Snackbar,MenuItem } from '@mui/material';
import axios from 'axios';

const ExpensesPage = () => {
  const [expenses,setExpenses] = useState([]);
  const [amount,setAmount]= useState("");
  const [category,setCategory]=useState("");
  const [notes,setNotes] = useState("");
  const [success,setSuccess] = useState(false);
  const [error,setError] = useState("");

  useEffect(()=>{
    const fetchExpense = async()=>{
      try {
        const response = await axios.get("http://localhost:5000/expenses");
        setExpenses(response.data.expenses || []);
      } catch (error) {
        console.error("failed to fetch Expenses",error);
        
      }
    };
    fetchExpense();
  },[]);

  const handleAddExpense = async ()=>{
    try {
      const response = await axios.post("http://localhost:5000/expenses",{
        amount,
        category,
        notes,
      });
      setExpenses((prev)=>[response.data.newExpense,...prev]);
      setSuccess(true);
      setAmount("");
      setCategory("");
      setNotes("");
    } catch (error) {
      setError("Failed to add expenses. Please try again.");
      console.log(error);
      
    }
  }
  const totalExpensesForExpensePage = expenses.reduce((acc,expense)=>acc + parseFloat(expense.amount),0);

  
  return (
    <div style={{padding:"2rem"}}>

      <h1 style={{color:"brown"}}>EXPENSES</h1>

      <h3>You Spent : ₹{totalExpensesForExpensePage.toFixed(2)} </h3>

      <h1>Add Expenses</h1>
      <TextField
        label="Expense Amount"
        type="number"
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
        fullWidth
        style={{marginBottom:"1rem"}} 
      />
      <TextField
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        style={{ marginBottom: "1rem" }}
      >
        <MenuItem value="Compulsory Spending">Compulsory</MenuItem>
        <MenuItem value="Miscellaneous Spending">Miscellaneous</MenuItem>
      </TextField>
      <TextField
        label="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        fullWidth
        style={{ marginBottom: "1rem" }}
      />
      <Button variant="contained" onClick={handleAddExpense}>
        Add Expense
      </Button>
      {error && <p style={{color:"red"}}>{error}</p>}
      <Snackbar 
        open = {success}
        autoHideDuration={3000}
        onClose={()=>setSuccess(false)}
        message="Expense added successfully"     
      />
      <h3>All Expense</h3>
      <ul>
        {expenses.map((expenses,index)=>(
          <li key={index}>
            <h3>₹{expenses.amount} - {expenses.category} ({expenses.notes})</h3>
          </li>
        ))};
      </ul>
        
      

      
    </div>
  );
};

export default ExpensesPage;
