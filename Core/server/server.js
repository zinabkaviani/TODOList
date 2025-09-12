import express from 'express';
import bodyParser from 'body-parser';
import tasksRouter from './routes/tasks.js';
import cors from 'cors';

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

app.use('/api/tasks', tasksRouter);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
