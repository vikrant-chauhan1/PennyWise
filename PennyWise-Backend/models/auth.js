import db from "../db.js";
import bcrypt from "bcryptjs";

// register a user

export async function registerUser(email,password){
    try {
        const checkQuery = "SELECT id FROM users WHERE email = $1";
        const checkResult = await db.query(checkQuery,[email]);
        if(checkResult.rows.length >0){
            throw new Error("Email already exists");
        }
    
    
        const hashedPassword= await bcrypt.hash(password,10);
        const query =`
            INSERT INTO users (email,password)
            VALUES ($1,$2)
            RETURNING id,email,created_at;
        `;
        
        const result =await db.query(query,[email,hashedPassword]);
        return result.rows[0];
    } catch (error) {
        console.error("Error registering user",error.message);
        
    }


   
}

// authentictae a user

export async function authenticateUser(email,password){
    const query = `
        SELECT id,email,password FROM users WHERE email=$1;
    
    
    `;
    const result = await db.query(query,[email]);
    if(result.rows[0]===0){
        return null; // no user found in the database
    }
    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return null; // wrong password
    }
    return {id:user.id,email:user.email};

}