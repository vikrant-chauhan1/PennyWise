import db from "../db.js";

// ADDING THE EARNINGS TO THE DATABSE

export const addEarnings = async(amount)=>{
    const result= await db.query(
        "INSERT INTO earnings (amount) VALUES ($1) RETURNING *",
        [amount]
    );
    return result.rows[0];
};

// GET TOTAL EARNINGS FROM DB

export const getTotalEarnings = async()=>{
    const result= await db.query(
        "SELECT SUM(amount) AS total FROM earnings"
    );
    return result.rows[0].total;

};