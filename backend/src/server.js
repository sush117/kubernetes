require("dotenv").config();

const app = require("./app");
const pool = require("./db/db");

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await pool.query("SELECT NOW()");

        console.log("Database connection successful");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error("Failed to connect to PostgreSQL");
        console.error(err);
        process.exit(1);
    }
}

startServer();