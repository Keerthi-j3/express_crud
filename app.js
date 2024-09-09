const express = require('express');
const app = express();
const port = 3000;

let tasks = []; // Array to store tasks

app.use(express.json()); // Middleware to parse JSON

// Serve the static HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// API to get all tasks (Read)
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// API to add a new task (Create)
app.post('/tasks', (req, res) => {
  const newTask = req.body.task;
  tasks.push(newTask);
  res.json({ message: 'Task added', tasks });
});

// API to update a task (Update)
app.put('/tasks/:index', (req, res) => {
  const index = req.params.index;
  const updatedTask = req.body.task;

  if (tasks[index]) {
    tasks[index] = updatedTask;
    res.json({ message: 'Task updated', tasks });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// API to delete a task (Delete)
app.delete('/tasks/:index', (req, res) => {
  const index = req.params.index;

  if (tasks[index]) {
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted', tasks });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
