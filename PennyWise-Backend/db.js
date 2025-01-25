import pkg from 'pg'; // CommonJS import
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // Required for Render's SSL connection
  },
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Connection error", err.stack));

export default db;
