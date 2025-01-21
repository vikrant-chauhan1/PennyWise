import React, { useContext, useState, useEffect } from "react";
import { TextField, Button, Card, Typography } from "@mui/material";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext"; 
import "../css/components.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default browser behavior (page reload) on form submission
    try {
      const response = await loginUser(email, password); // send credentials to backend
      console.log(response);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setUser(response.data.user); // set user details in context
      console.log("user updated");
      window.location.replace("/summary"); 
    } catch (error) {
      setError(error.response?.data?.message || "Error logging in");
    }
  };

  

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <Card  
    sx={{
      background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      margin: "2rem auto",
      color: "white",
      textAlign: "center",
    }}
    
    >
      <Typography sx={{
          fontSize:" 1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "1rem",
          color: "#3f51b5",


        }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit} className="login-form">
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
        {error && (
          <Typography className="login-error">
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
      <Typography className="login-register-link">
        Don't have an account?{" "}
        <Button color="primary" onClick={handleRegisterRedirect}>
          Register
        </Button>
      </Typography>
    </Card>
  );
};

export default Login;
