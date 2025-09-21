import taskService from "../services/taskService.js";

export const getTasks = async (req, res) => {
    const tasks = await taskService.getAll();
    const { date } = req.query;

    if (date) {
        res.json(tasks[date] || []);
    } else {
        res.json(Object.keys(tasks).map(date => ({ date, tasks: tasks[date] })));
    }
};

export const addTask = async (req, res) => {
    const { date, task } = req.body;
    if (!date || !task) {
        return res.status(400).json({ error: "Date and task are required" });
    }
    const updated = await taskService.add(date, task);
    res.json(updated);
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { date, text, completed } = req.body;

    const updated = await taskService.update(id, date, { text, completed });
    if (!updated) return res.status(404).json({ error: "Task or date not found" });

    res.json(updated);
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const { date } = req.query;

    const updated = await taskService.remove(id, date);
    if (!updated) return res.status(404).json({ error: "Task or date not found" });

    res.json(updated);
};
