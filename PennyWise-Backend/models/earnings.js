import db from "../db.js";

// ADDING THE EARNINGS TO THE DATABSE

export const addEarnings = async(amount,notes,userId)=>{
    const result= await db.query(
        "INSERT INTO earnings (amount,notes,user_id) VALUES ($1,$2,$3) RETURNING *",
        [amount,notes,userId]
    );
    return result.rows[0];
};

// GET TOTAL EARNINGS FROM DB

export const getTotalEarnings = async(userID)=>{
    const result= await db.query(
        "SELECT SUM(amount) AS total FROM earnings WHERE user_id = $1",[userID]
    );
    return result.rows[0].total;

};

export const getEarnings = async(userID)=>{
    const result = await db.query("SELECT * FROM EARNINGS WHERE user_id = $1",[userID]);
    return result.rows;
}

export const updateEarnings = async(amount ,notes,id,userID)=>{
    const result = await db.query("UPDATE earnings SET amount = $1 , notes = $2 WHERE id = $3 AND user_id = $4 RETURNING *",[amount,notes,id,userID]);
    
    return result;
    
}