require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP"
    });
});

app.use("/tasks", taskRoutes);

module.exports = app;