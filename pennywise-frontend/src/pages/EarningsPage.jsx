import React, { useState, useEffect } from "react";
import { TextField, Button, Table, Snackbar, TableBody, TableCell, TableContainer, TableRow, TableHead, Paper } from "@mui/material";
import axios from "axios";
import "../css/components.css";

const EarningsPage = () => {
  const [earnings, setEarnings] = useState([]);
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/earnings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setEarnings(response.data.earnings);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch earnings", error);
      }
    };
    fetchEarnings();
  }, []);

  const handleAddEarnings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/earnings", {
        amount,
        notes,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      setEarnings((prev) => [response.data, ...prev]);
      setSuccess(true);
      setAmount("");
      setNotes("");
    } catch (error) {
      setError("Failed to add earning, Please try again.");
      console.log(error);
      window.location.reload();
    }
  };

  // Calculate total earnings only if there are earnings
  const totalEarnings = earnings.length > 0 ? earnings.reduce((acc, earning) => acc + Number(earning.amount), 0) : 0;

  return (
    <div className="earnings-card">
      <h1 style={{ color: "green" }}>EARNINGS</h1>

      <h3 className="amount">Total Earnings: ₹{totalEarnings.toFixed(2)}</h3>

      <h2>Add Earnings</h2>
      <TextField
        label="Earnings Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        style={{ marginBottom: "1rem" }}
      />
      <TextField
        label="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        fullWidth
        style={{ marginBottom: "1rem" }}
      />
      <button className="button-earnings" onClick={handleAddEarnings}>
        Add Earnings
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        message="Earnings are added successfully"
      />

      <h3>All Earnings</h3>

      {loading ? (
        <p>Loading earnings...</p>
      ) : (
        <TableContainer component={Paper}>
          <Table >
            <TableHead>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {earnings.map((earning, index) => (
                <TableRow key={index}>
                  <TableCell>{earning.amount}</TableCell>
                  <TableCell>{earning.notes}</TableCell>
                  <TableCell>{new Date(earning.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default EarningsPage;
