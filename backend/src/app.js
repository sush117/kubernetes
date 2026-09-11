require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const client = require("@prometheus-io/client");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

app.use(morgan("dev"));


// Collect default Node.js and process metrics
client.collectDefaultMetrics();


// Prometheus metrics endpoint
app.get("/metrics", async (req, res) => {

    try {

        res.set("Content-Type", client.register.contentType);

        const metrics = await client.register.metrics();

        res.end(metrics);

    } catch (error) {

        res.status(500).end(error.message);

    }

});


app.get("/health", (req, res) => {

    res.status(200).json({
        status: "UP",
        version: "v2"
    });

});


app.use("/tasks", taskRoutes);

module.exports = app;