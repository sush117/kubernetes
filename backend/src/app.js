require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");

const express = require("express");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Temporary health endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP"
    });
});

app.use("/tasks", taskRoutes);
module.exports = app;