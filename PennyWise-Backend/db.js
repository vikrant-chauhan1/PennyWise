import { Client } from 'pg'; 

const db = new Client({
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false,  // Necessary for Render's SSL connection
  },
});

// Connecting to the database
db.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Connection error", err.stack));

export default db;
