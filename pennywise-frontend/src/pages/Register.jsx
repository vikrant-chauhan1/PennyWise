import React, { use } from "react";
import { TextField, Button, Card, Typography } from "@mui/material";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const register = ()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmpassword] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();

    
}