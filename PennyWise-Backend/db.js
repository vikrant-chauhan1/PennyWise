import pg from "pg";


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


export default db;