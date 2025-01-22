import React, { useEffect, useState } from "react";
import axios from "axios";

const SummaryPage = () => {
    const [earnings, setEarnings] = useState(0);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const token = localStorage.getItem("token");
                const earningsResponse = await axios.get("http://localhost:5000/earnings", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const expensesResponse = await axios.get("http://localhost:5000/expenses", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEarnings(earningsResponse.data.totalEarnings || 0);
                setExpenses(expensesResponse.data.expenses || []);
            } catch (error) {
                console.error("Failed to fetch summary", error);
            }
        };
        fetchSummary();
    }, []);

    const totalExpenses = expenses.reduce((acc, expense) => acc + Number(expense.amount), 0);
    const expectedSavings = earnings - totalExpenses;

    return (
        <div className="body-div">
            <div className="section1">
                <div className="card">
                    <div><img src="earnings.png" alt="Earnings" /></div>
                    <div>
                        <h1 >Earnings</h1>
                        <p style={{ color: 'green' }}>₹{earnings}</p>
                    </div>
                </div>
                <div className="card">
                    <div><img src="expenses.png" alt="Expenses" /></div>
                    <div>
                        <h1 >Expenses</h1>
                        <p style={{ color: 'red' }}>₹{totalExpenses}</p>
                    </div>
                </div>
                <div className="card">
                    <div><img src="savings.png" alt="Savings" /></div>
                    <div>
                        <h1 >Savings</h1>
                        {expectedSavings >0 ? 
                        <p style={{ color: 'darkgreen' }}>₹{expectedSavings}</p>
                        :
                        <p style={{ color: 'red' }}>₹{expectedSavings}</p>
                        }
                        
                    </div>
                </div>
            </div>

             
            <div>
                <h2>Last Transactions </h2>
            </div>

            <div className="section-transactions">
                <ul className="interactive-list">
                    {expenses.map((expense, index) => (
                        <li key={index} className="interactive-list-item"><h4>₹{expense.amount} - {expense.category} ({expense.notes})</h4></li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SummaryPage;
/*<div>
<h2>Expense History</h2>
{ Render expense history dynamically if required }
</div>

<div className="section2">
{ Chart component or placeholder }
<p>Chart here</p>
</div> 
*/