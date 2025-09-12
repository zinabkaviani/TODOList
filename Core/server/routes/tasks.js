import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Resolve path to tasks.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tasksFilePath = path.join(__dirname, '../tasks.json');

// Helper function to read tasks from tasks.json
async function readTasks() {
  try {
    const data = await fs.readFile(tasksFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, return empty object
    return {};
  }
}

// Helper function to write tasks to tasks.json
async function writeTasks(tasks) {
  await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf-8');
}

// GET tasks for a specific date or all tasks
router.get('/', async (req, res) => {
  const tasks = await readTasks();
  const { date } = req.query;
  if (date) {
    res.json(tasks[date] || []);
  } else {
    res.json(Object.keys(tasks).map(date => ({ date, tasks: tasks[date] })));
  }
});

// POST a new task
router.post('/', async (req, res) => {
  const { date, task } = req.body;
  if (!date || !task) {
    return res.status(400).json({ error: 'Date and task are required' });
  }
  const tasks = await readTasks();
  if (!tasks[date]) {
    tasks[date] = [];
  }
  tasks[date].push({ id: Date.now(), text: task, completed: false });
  await writeTasks(tasks);
  res.json(tasks[date]);
});

// PUT to update a task (e.g., mark as completed or edit text)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { date, text, completed } = req.body;
  const tasks = await readTasks();
  if (!date || !tasks[date]) {
    return res.status(404).json({ error: 'Date not found' });
  }
  const task = tasks[date].find(t => t.id == id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  if (text !== undefined) task.text = text;
  if (completed !== undefined) task.completed = completed;
  await writeTasks(tasks);
  res.json(tasks[date]);
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { date } = req.body;
  const tasks = await readTasks();
  if (!date || !tasks[date]) {
    return res.status(404).json({ error: 'Date not found' });
  }
  tasks[date] = tasks[date].filter(t => t.id != id);
  await writeTasks(tasks);
  res.json(tasks[date]);
});

export default router;
