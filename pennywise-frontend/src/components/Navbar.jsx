import React,{useContext} from "react";
import { AppBar,Toolbar,Typography,Button } from "@mui/material";
import {Link} from "react-router-dom";
import { UserContext } from "../UserContext";

const Navbar=()=>{

    const {logout} = useContext(UserContext);
    return (
        <AppBar 
    position="static" 
    sx={{ 
        backgroundColor: "#0C0C0C", 
        borderBottom: "2px solid grey" 
    }}
>
    <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#fff" }}>
            PennyWise
        </Typography>
        <Button 
            color="inherit" 
            component={Link} 
            to="/summary"
            sx={{ '&:hover': { backgroundColor: "grey" } }}
        >
            Summary
        </Button>
        <Button 
            color="inherit" 
            component={Link} 
            to="/expenses"
            sx={{ '&:hover': { backgroundColor: "grey" } }}
        >
            Expenses
        </Button>
        <Button 
            color="inherit" 
            component={Link} 
            to="/earnings"
            sx={{ '&:hover': { backgroundColor: "grey" } }}
        >
            Earnings
        </Button>
        <Button 
            color="inherit" 
            component={Link} 
            onClick={logout}
            sx={{ '&:hover': { backgroundColor: "grey" } }}
        >
            Logout
        </Button>
    </Toolbar>
</AppBar>

    );
        
        
    
};

export default Navbar;