import db from "../db.js";

// ADDING THE EARNINGS TO THE DATABSE

export const addEarnings = async(amount,notes)=>{
    const result= await db.query(
        "INSERT INTO earnings (amount,notes) VALUES ($1,$2) RETURNING *",
        [amount,notes]
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

export const getEarnings = async()=>{
    const result = await db.query("SELECT * FROM EARNINGS");
    return result.rows;
}