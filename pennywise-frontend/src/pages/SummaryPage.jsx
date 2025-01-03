import React, { useEffect, useState } from "react";
import axios from "axios";



const SummaryPage =()=>{
    const [earnings,setEarnings]= useState(0);
    const [expenses,setExpenses]= useState([]);

    useEffect(()=>{
        const fetchSummary = async ()=>{
            try {
                const token = localStorage.getItem("token");
                const earningsResponse = await axios.get("http://localhost:5000/earnings",{
                    headers: { Authorization: `Bearer ${token}` },
                });

                const expensesResponse = await axios.get("http://localhost:5000/expenses",{
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEarnings(earningsResponse.data.totalEarnings || 0);
                setExpenses(expensesResponse.data.expenses || []);
                console.log(earningsResponse);
                console.log(expensesResponse);
            } catch (error) {
                console.error("Failed to fetch summary ", error);
                
            }
        };
        fetchSummary();
       
    },[]);

    console.log(expenses);

    // converting the expenses array of objexts where amount is stored as a string is converted to number using the number function and then using the reduce functon we itterate over each element inthe array and add everywith to the accumulator(acc) which is given an initial value of 0
    const totalExpenses = expenses.reduce((acc,expense)=>acc + Number(expense.amount),0);


    return(
       
        <div style={{padding: "2rem"}}>
            <h2>Summary</h2>
            <h3><p>Total Earnings : ₹{earnings} </p></h3>
            <h3><p>Total Expenses : ₹{totalExpenses}</p></h3>
            <h3>Last Transactions</h3>
            <ul>
                {expenses.slice(0,20).map((expense,index)=>(
                    <li key={index}>
                        <h4>₹{expense.amount} - {expense.category} ({expense.notes})</h4>
                    </li>
                ))}
            </ul>
           
        </div>
        
    );
}

export default SummaryPage;