const pool = require("../db/db");

// GET /tasks
exports.getTasks = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY id"
        );

        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// POST /tasks
exports.createTask = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    try {
        const result = await pool.query(
            `INSERT INTO tasks (title)
             VALUES ($1)
             RETURNING *`,
            [title]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// PUT /tasks/:id
exports.updateTask = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query(
            `UPDATE tasks
             SET completed = NOT completed
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// DELETE /tasks/:id
exports.deleteTask = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1",
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.sendStatus(204);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};