import db from "../db.js"

//add expenses to the database 

export const addExpenses = async(amount ,category, notes)=>{
    const result = await db.query(
        "INSERT INTO expenses (amount, category, notes) VALUES ($1,$2,$3) RETURNING *",
        [amount,category,notes]
    );
    return result.rows[0];
};

// get all the expenses from the database

export const getExpenses = async ()=>{
    const result = await db.query(
        "SELECT * FROM expenses"
    );
    return result.rows;
}

