import pkg from 'pg'; 
const { Client } = pkg; 

const db = new Client({
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false,  // Required for Render's SSL connection
  },
});


db.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Connection error", err.stack));

export default db;
