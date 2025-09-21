import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tasksFilePath = path.join(__dirname, "../tasks.json");

async function readTasks() {
    try {
        const data = await fs.readFile(tasksFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return {};
    }
}

async function writeTasks(tasks) {
    await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), "utf-8");
}

export default {
    getAll: async () => await readTasks(),

    add: async (date, task) => {
        const tasks = await readTasks();
        if (!tasks[date]) tasks[date] = [];
        const newTask = { id: Date.now(), text: task, completed: false };
        tasks[date].push(newTask);
        await writeTasks(tasks);
        return tasks[date];
    },

    update: async (id, date, updates) => {
        const tasks = await readTasks();
        if (!date || !tasks[date]) return null;

        const task = tasks[date].find(t => t.id == id);
        if (!task) return null;

        if (updates.text !== undefined) task.text = updates.text;
        if (updates.completed !== undefined) task.completed = updates.completed;

        await writeTasks(tasks);
        return tasks[date];
    },

    remove: async (id, date) => {
        const tasks = await readTasks();
        if (!date || !tasks[date]) return null;

        tasks[date] = tasks[date].filter(t => t.id !== id);
        await writeTasks(tasks);
        return tasks[date];
    }
};
