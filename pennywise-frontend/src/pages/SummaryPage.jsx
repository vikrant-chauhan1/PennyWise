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

    // converting the expenses array of objects where amount is stored as a string is converted to number using the number function and then using the reduce functon we itterate over each element inthe array and add everywith to the accumulator(acc) which is given an initial value of 0
    const totalExpenses = expenses.reduce((acc,expense)=>acc + Number(expense.amount),0);
    const expectedSavings = earnings-totalExpenses;


    return(
       
        <div className="body-div">
            <div style={{padding: "2rem"}}>
                <h1 style={{color:""}}>SUMMARY</h1>
                <h3><p>Total Earnings : ₹{earnings} </p></h3>
                <h3><p>Total Expenses : ₹{totalExpenses}</p></h3>
                <h3><p>Expected Savings :₹{expectedSavings}</p></h3>
                <h3>Last Transactions</h3>
                <ul className="interactive-list">
                {expenses.slice(0,20).map((expense,index)=>(
                    <li key={index} className="interactive-list-item">
                        <h4>₹{expense.amount} - {expense.category} ({expense.notes})</h4>
                    </li>
                ))}
                </ul>
           
            </div>
        </div>
        
    );
}

export default SummaryPage;