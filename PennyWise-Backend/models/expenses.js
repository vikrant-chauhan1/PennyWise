import db from "../db.js"

//add expenses to the database 

export const addExpenses = async(amount ,category, notes,userID)=>{
    const result = await db.query(
        "INSERT INTO expenses (amount, category, notes,user_id) VALUES ($1,$2,$3,$4) RETURNING *",
        [amount,category,notes,userID]
    );
    return result.rows[0];
};

// get all the expenses from the database

export const getExpenses = async (userID)=>{
    const result = await db.query(
        "SELECT * FROM expenses WHERE user_id = $1",[userID]
    );
    return result.rows;
}

