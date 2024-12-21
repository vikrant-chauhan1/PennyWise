import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import earningsRoutes from "./routes/earnings.js";
import expensesRoutes from "./routes/expenses.js";

// Loading the env variables from the env file 
dotenv.config();

const app = express();

const port = process.env.PORT;

// middleware to parse json (this is just like bodyparser)

app.use(express.json());

// setting up pg client
const db= new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"PennyWise",
    password:"Avon@123",
    port:5432,
});

// connecting to the database

db.connect()
    .then(()=>console.log("connected to postgresSQL database"))
    .catch((err)=> console.error("connection error", err.stack));


// using the created routes in the main server file

app.use(earningsRoutes);
app.use(expensesRoutes);


app.get("/",(req,res)=>{
    res.send("PennyWise backend is running !");

});


// starting the server

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});


