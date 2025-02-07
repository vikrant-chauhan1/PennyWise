import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { loginUser } from "../api/auth";
import "../css/components.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await loginUser(email, password);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setUser(response.data.user); // Set user context
      window.location.replace("/summary"); // Redirect after login
    } catch (error) {
      setError(error.response?.data?.message || "Error logging in");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="body">
      {/* Navigation Bar */}
      <nav>
        <div className="logo">
          <p>PennyWise</p>
        </div>
        <div className="navList">
          <p>Start tracking your expenses today</p>
          
        </div>
      </nav>

     {/* Hero Section */}
      <div className="heroSection">
        <div className="hero-content">
          <h1>PennyWise</h1>
          <p>Track your finances, achieve your goals!</p>
          <p>Log your spending effortlessly, categorize your expenses, and keep track of your financial health with ease.</p>
          <button className="hero-button" onClick={handleRegisterRedirect}>Get Started</button>
        </div>
      </div>


      

      {/* Login Section */}
      <div className="login-total">
        <h1 className="login-text"><strong> managing your expenses today!</strong></h1>
        <div className="login-container">
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className="error-message">{error}</p>}
              <button type="submit">Login</button>
            </form>
            <p className="register-text">
              Don't have an account?{" "}
              <button onClick={handleRegisterRedirect} className="link-button">
                Register
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p>Made By Vikrant Chauhan</p>
      </footer>
    </div>
  );
};

export default Login;
