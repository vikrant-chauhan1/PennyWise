import React, { useContext, useState } from "react";
import { TextField, Button, Card, Typography,Box } from "@mui/material";
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
     
      const token = response.data.token;
      localStorage.setItem("token", token);
      setUser(response.data.user); // set user details in context
      
      window.location.replace("/summary"); 
    } catch (error) {
      setError(error.response?.data?.message || "Error logging in");
    }
  };

  

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <Box>
      {/* Header Section */}
      <Box
        component="header"
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">PennyWise</Typography>
        <Typography variant="body1">Track your finances, achieve your goals!</Typography>
      </Box>

      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "80vh", // Ensure it takes up most of the viewport height
          padding: "2rem",
          background: "linear-gradient(to right, #1976d2, #64b5f6)",
          color: "white",
        }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to PennyWise
        </Typography>
        <Typography variant="h6" gutterBottom>
          Your personal finance tracker
        </Typography>
        <Card
          sx={{
            maxWidth: "400px",
            margin: "2rem auto",
            padding: "2rem",
            background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "#3f51b5",
            }}
          >
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
              <Typography
                sx={{
                  color: "red",
                  fontSize: "0.9rem",
                  textAlign: "left",
                  margin: "0.5rem 0",
                }}
              >
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
          <Typography sx={{ marginTop: "1rem" }}>
            Don't have an account?{" "}
            <Button color="primary" onClick={handleRegisterRedirect}>
              Register
            </Button>
          </Typography>
        </Card>
      </Box>

      {/* Features Section */}
      <Box
        component="section"
        sx={{
          textAlign: "center",
          padding: "4rem 2rem", // Increased padding for better spacing
          backgroundColor: "#f9f9f9",
          minHeight: "70vh", // Ensures the section has enough height
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Center content vertically
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold", // Bold heading
            marginBottom: "2rem", // Add space below the heading
            textAlign: "center",
          }}
        >
          Why Choose PennyWise?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            flexWrap: "wrap", // Allows wrapping on smaller screens
            width: "100%", // Ensures cards stretch across the available width
            height: "100%", // Ensures cards take up equal height
          }}
        >
          {/* Card 1 */}
          <Box
            sx={{
              backgroundColor: "white",
              padding: "2rem", // Increased padding for larger cards
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              width: "300px", // Consistent card width
              height: "250px", // Increase card height for better visual balance
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
              Track Expenses
            </Typography>
            <Typography variant="body1">
              Log your spending effortlessly, categorize your expenses, and keep track of your financial health with ease.
            </Typography>
          </Box>
          {/* Card 2 */}
          <Box
            sx={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              width: "300px",
              height: "250px", // Increase card height for better visual balance
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
              Visual Insights
            </Typography>
            <Typography variant="body1">
              Get detailed charts and visualizations of your spending patterns, so you can identify areas for improvement.
            </Typography>
          </Box>
          {/* Card 3 */}
          <Box
            sx={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              width: "300px",
              height: "250px", // Increase card height for better visual balance
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
              Simplify Budgeting
            </Typography>
            <Typography variant="body1">
              Organize your income and expenses, set budgets, and monitor your progress towards your financial goals.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Footer Section */}
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          backgroundColor: "#1976d2",
          color: "white",
          padding: "1rem",
        }}
      >
        <Typography>© 2025 PennyWise. All Rights Reserved.</Typography>
      </Box>
    </Box>

    
  );
};

export default Login;
