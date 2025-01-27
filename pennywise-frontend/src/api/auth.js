import axios from "axios"; 

const API_BASE = "https://pennywise-jabt.onrender.com";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE}/login`, { email, password });
    return response; // Return the response in case it's successful
  } catch (error) {
    console.error("Error during login:", error); // Log the full error
    throw error; // Rethrow the error so it can be caught in the component
    
  }
};

export const registerUser = async (email,password)=>{
  try{
    const response = await axios.post(`${API_BASE}/register`,{email,password});
    return response;
    
  }catch(error){
    console.error("Error During Registering");

  }
}

const authApi = { loginUser, registerUser };

export default authApi;
  
