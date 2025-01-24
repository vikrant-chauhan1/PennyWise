import React,{useState,useEffect} from 'react';
import { TextField,Button,Snackbar,MenuItem } from '@mui/material';
import axios from 'axios';
import "../css/components.css"
import "../css/global.css";
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
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }
        const response = await axios.get("http://localhost:5000/expenses",{
          headers: {Authorization: `Bearer ${token}`}
        });
        setExpenses(response.data.expenses || []);
      } catch (error) {
        console.error("failed to fetch Expenses",error);
        
      }
    };
    fetchExpense();
  },[]);

  const handleAddExpense = async ()=>{
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const response = await axios.post("http://localhost:5000/expenses",{
        amount,
        category,
        notes,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    
    );
      setExpenses((prev)=>[response.data.newExpense,...prev]);
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
  }
  const handleDelete = async(expensesID)=>{
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`http://localhost:5000/expenses/${expensesID}`,
        {headers:{Authorization : `Bearer ${token}`}}
      );

      console.log(response.data.message);

      setExpenses((prev)=>prev.filter((expense)=>expense.id!== expensesID))
      

     
    } catch (error) {
      console.error("Error deleteing expense",error);
      
    }
  }
  const totalExpensesForExpensePage = expenses.reduce((acc,expense)=>acc + parseFloat(expense.amount),0);

  
  return (
    <div className='body-div'>
          <div className='expenses-card'>

<h1 style={{color:"brown"}}>EXPENSES</h1>

<h3 className='amount'>You Spent : ₹{totalExpensesForExpensePage.toFixed(2)} </h3>

<h1 className='heading-gradient'>Add Expenses</h1>
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
  className='category'
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
<button  onClick={handleAddExpense} className='button-expenses'>
  Add expenses
</button>
{error && <p style={{color:"red"}}>{error}</p>}
<Snackbar 
  open = {success}
  autoHideDuration={3000}
  onClose={()=>setSuccess(false)}
  message="Expense added successfully"     
/>
<h3>All Expense</h3>
<ul className='interactive-list'>
  {expenses.map((expenses,index)=>(
    <li key={index} className='interactive-list-item'>
      
      <h3>₹{expenses.amount} - {expenses.category} ({expenses.notes})</h3>
      <Button onClick={()=>handleDelete(expenses.id)}>Delete</Button>
    </li>
  ))}
</ul>
  



</div>
    </div>
  )
};

export default ExpensesPage;
