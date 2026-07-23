require("dotenv").config();

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

module.exports = app;