import React, { useState, useEffect } from "react";
import { TextField, Button, Table, Snackbar, TableBody, TableCell, TableContainer, TableRow, TableHead, Paper } from "@mui/material";
import axios from "axios";
import "../css/components.css";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const EarningsPage = () => {
  const [earnings, setEarnings] = useState([]);
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingEarning, setEditingEarning] = useState(null);
  const [openEditModal , setOpenEditModal] = useState(false);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://pennywise-jabt.onrender.com/earnings", {
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
      const response = await axios.post("https://pennywise-jabt.onrender.com/earnings", {
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

  const handleEdit = (earning) => {
    setEditingEarning(earning);
    setOpenEditModal(true);
  }

  const submitEdit = async()=>{
    try {
      console.log("put req starts")
      const token = localStorage.getItem("token");
      const response = await axios.put(`https://pennywise-jabt.onrender.com/earnings/${editingEarning.id}`,
      {amount:editingEarning.amount , notes:editingEarning.notes},
      {headers: {Authorization : `Bearer ${token}` }}
      
    );
    console.log("put req is going thru")

    setEarnings((prev)=>
      prev.map((e)=>(e.id === editingEarning.id ? response.data : e))
    );
    setOpenEditModal(false);

      

    } catch (error) {
      console.error("failed to edit earning", error);
      
    }
  }

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
        <TableContainer component={Paper} sx={{ backgroundColor: "#f5f5f5", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
  <Table>
    <TableHead>
      <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
        <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Amount</TableCell>
        <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Notes</TableCell>
        <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Date</TableCell>
        <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {earnings.map((earning, index) => (
        <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff" }}>
          <TableCell>{earning.amount}</TableCell>
          <TableCell>{earning.notes}</TableCell>
          <TableCell>{new Date(earning.created_at).toLocaleString()}</TableCell>
          <TableCell>
            <Button
              onClick={() => handleEdit(earning)}
              sx={{
                color: "#555",
                backgroundColor: "#ddd",
                "&:hover": { backgroundColor: "#ccc", color: "#222" },
              }}
            >
              Edit
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

      )}

      <Dialog open={openEditModal} onClose={()=>setOpenEditModal(false)} aria-labelledby="edit-dialog-title">
        <DialogTitle>Edit Earning</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            margin="normal"
            value={editingEarning?.amount || ""}
            onChange={(e)=>{
              setEditingEarning((prev)=>({...prev,amount:e.target.value}))
            }}
          
          />
          <TextField
            label="Notes"
            fullWidth
            margin="normal"
            value={editingEarning?.notes || ""}
            onChange={(e) =>
                setEditingEarning((prev) => ({ ...prev, notes: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button onClick={submitEdit} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>

      </Dialog>
    </div>
  );
};

export default EarningsPage;
