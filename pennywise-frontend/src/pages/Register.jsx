import React, { useState } from "react";
import { TextField, Button, Card, Typography } from "@mui/material";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Register = ()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            setError("Passwords do not match");
            return;
        }
        try {
            await registerUser(email,password);
            alert("Registration Successfull");
            navigate("/")
        } catch (error) {
            setError("Error registering user");
            
        }

    };

    return (
        <Card style={{ padding: "2rem", maxWidth: "400px", margin: "2rem auto" }}>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && (
              <Typography color="error" variant="body2" gutterBottom>
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </form>
        </Card>
    );
};




export default Register;