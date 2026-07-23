let tasks = [];
let nextId = 1;

// GET /tasks
exports.getTasks = (req, res) => {
    res.json(tasks);
};

// POST /tasks
exports.createTask = (req, res) => {

    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    const task = {
        id: nextId++,
        title,
        completed: false,
        created_at: new Date()
    };

    tasks.push(task);

    res.status(201).json(task);
};

// PUT /tasks/:id
exports.updateTask = (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    task.completed = !task.completed;

    res.json(task);
};

// DELETE /tasks/:id
exports.deleteTask = (req, res) => {

    const id = Number(req.params.id);

    tasks = tasks.filter(t => t.id !== id);

    res.sendStatus(204);
};