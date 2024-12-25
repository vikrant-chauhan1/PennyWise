import React from "react";
import { AppBar,Toolbar,Typography,Button } from "@mui/material";
import {Link} from "react-router-dom";

const Navbar=()=>{
   return(
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow:1}}>
                    PennyWise

                </Typography>
                <Button color="inherit" component={Link} to="/summary">
                    Summary

                </Button>
                <Button color="inherit" component={Link} to="/expenses">
                    Expenses

                </Button>
                <Button color="inherit" component={Link} to="/earnings">
                     Earnings

                </Button>
            </Toolbar>

        </AppBar>
    );
};

export default Navbar;