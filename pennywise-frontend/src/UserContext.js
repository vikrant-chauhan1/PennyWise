import React, { createContext, useState, useEffect } from "react";
import axios from "axios";



export const UserContext = createContext();

export const UserProvider = ({ children }) => {


  const [user, setUser] = useState(null); // Stores user details
  const [loading, setLoading] = useState(true); // Manages loading state
  
 

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("https://pennywise-jabt.onrender.com/validate-token", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user); // Populate user state
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem("token"); // Clear invalid token
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.replace("/login");
    
    

  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
