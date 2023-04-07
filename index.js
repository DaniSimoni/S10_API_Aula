require('dotenv').config()

const express = require('express');
const connection = require('./src/database');

const Task = require('./src/models/task');
const User = require('./src/models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const log = require('./src/middlewares/log');
const validateNewUser = require('./src/middlewares/validateNewUser');

const validateToken = require('./src/middlewares/validateToken');
const createTask = require('./src/controllers/tasks/createTask');
const findTasks = require('./src/controllers/tasks/findTasks');
const deleteTasks = require('./src/controllers/tasks/deleteTask');
const updateTask = require('./src/controllers/tasks/updateTask');
const updateUser = require('./src/controllers/users/updateUser');
const loginUser = require('./src/controllers/users/loginUser');
const app = express();

app.use(express.json());
app.use(log);

app.listen(3333, () => console.log("Aplicação Online"));

app.use(express.json());

connection.authenticate()
connection.sync({alter: true})
console.log('Servidor Connectado!')



app.post('/tarefas', validateToken, createTask);
app.get('/tarefas', validateToken, findTasks);
app.delete('/tarefas/:id', validateToken, deleteTasks);
app.put('/tarefas/:id', validateToken, updateTask);

app.post('/users', validateNewUser, updateUser);
app.post('/users/login', loginUser);

