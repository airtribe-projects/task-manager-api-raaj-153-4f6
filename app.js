
const express = require('express');
const tasksCollection = require('./task.json');
const Response = require('./response.js');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tasks = tasksCollection.tasks || [];

app.get('/tasks', (req, res) => {
    try {
        if (!tasks || tasks.length === 0) {
            return res.status(404).send(new Response(false, 'No tasks found', {}));
        }
        return res.status(200).send(new Response(true, 'Tasks retrieved successfully', tasks));
    } catch (err) {
        return res.status(500).send(new Response(false, 'Internal Server Error', {}));
    }
});

app.get('/tasks/:id', (req, res) => {
    try {
        const taskId = parseInt(req.params.id, 10);
        const length = tasks.length;
        for (let i = 0; i < length; i++) {
            if (tasks[i].id === taskId) {
                return res.status(200).send(new Response(true, `Task found with id: ${taskId}`, tasks[i]));
            }
        }
        return res.status(404).send(new Response(false, `Task not found with id: ${taskId}`, {}));
    } catch (err) {
        return res.status(500).send(new Response(false, 'Internal Server Error', {}));
    }
});

app.post('/tasks', (req, res) => {
    try {
        const newTask = req.body;
        if (!newTask || !newTask.title || !newTask.description || newTask.completed === undefined) {
            return res.status(400).send(new Response(false, 'Invalid task data', {}));
        }
        newTask.id = tasks.length + 1;
        tasks.push(newTask);
        fs.writeFileSync('./task.json', JSON.stringify({ tasks }, null, 2), 'utf8');
        return res.status(201).send(new Response(true, `Task created successfully with newId: ${newTask.id}`, newTask));
    } catch (err) {
        return res.status(500).send(new Response(false, 'Internal Server Error', {}));
    }
});

app.put('/tasks/:id', (req, res) => {
    try {
        const taskId = parseInt(req.params.id, 10);
        const updatedTask = req.body;
        if (!updatedTask || !updatedTask.title || !updatedTask.description) {
            return res.status(400).send(new Response(false, 'Invalid task data', {}));
        }
        const length = tasks.length;
        for (let i = 0; i < length; i++) {
            if (tasks[i].id === taskId) {
                updatedTask.id = taskId;
                tasks[i] = updatedTask;
                fs.writeFileSync('./task.json', JSON.stringify({ tasks }, null, 2), 'utf8');
                return res.status(200).send(new Response(true, `Task updated successfully with id: ${taskId}`, updatedTask));
            }
        }
        return res.status(404).send(new Response(false, 'Task not found', {}));
    } catch (err) {
        return res.status(500).send(new Response(false, 'Internal Server Error', {}));
    }
});

app.delete('/tasks/:id', (req, res) => {
    try {
        const taskId = parseInt(req.params.id, 10);
        const length = tasks.length;
        for (let i = 0; i < length; i++) {
            if (tasks[i].id === taskId) {
                tasks.splice(i, 1);
                fs.writeFileSync('./task.json', JSON.stringify({ tasks }, null, 2), 'utf8');
                return res.status(200).send(new Response(true, `Deleted task with id: ${taskId} successfully`, tasks));
            }
        }
        return res.status(404).send(new Response(false, 'Task not found', {}));
    } catch (err) {
        return res.status(500).send(new Response(false, 'Internal Server Error', {}));
    }
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;