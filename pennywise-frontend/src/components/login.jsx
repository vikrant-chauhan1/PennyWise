import React, { useContext, useState, useEffect } from "react";
import { TextField, Button, Card, Typography } from "@mui/material";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

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
    <Card style={{ padding: "2rem", maxWidth: "400px", margin: "2rem auto" }}>
      <Typography variant="h5" gutterBottom>
        Login
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
        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
      <Typography variant="body2" align="center" style={{ marginTop: "1rem" }}>
        Don't have an account?{" "}
        <Button color="primary" onClick={handleRegisterRedirect}>
          Register
        </Button>
      </Typography>
    </Card>
  );
};

export default Login;
