// Author: Farhan Nazir
const fs = require('fs');
const path = require('path');

const data = path.join(__dirname, '../data/tasks-data.json');

let fetchTasks = () => {
  try {
    let tasksData = fs.readFileSync(data);
    return JSON.parse(tasksData);
  }
 catch (e) {
    return [];
  }
};

let saveTask = task => {
  fs.writeFileSync(data, JSON.stringify(task));
};

let addTask = (title, body) => {
  let tasks = fetchTasks();
  let task = {
    title,
    body
  };
  let duplicateTasks = filterTasks(tasks, title);

  if (duplicateTasks.length === 0) {
    tasks.push(task);
    saveTask(tasks);
    return task;
  }
};

let getAll = () => {
  return fetchTasks();
};

let removeTask = title => {
  let tasks = fetchTasks();
  let filteredTask = tasks.filter(task => task.title !== title);
  saveTask(filteredTask);
  console.log(tasks.length !== filteredTask.length);
  return tasks.length !== filteredTask.length;
};

let getTask = title => {
  let tasks = fetchTasks();
  let filteredTasks = filterTasks(tasks, title);
  return filteredTasks[0];
};

let updateTask = (title, body) => {
  let tasks = fetchTasks();
  let filteredTasks = filterTasks(tasks, title);
  let taskTitle = { title: title, body: body };

  // console.log(filteredTasks[0]);
  let updated = Object.assign(taskTitle, filteredTasks);
  let duplicateTasks = filteredTasks;

  if (duplicateTasks.length === 0) {
    tasks.push(updated);
    saveTask(tasks);
    return updated.title;
  }
};

let logTasks = task => {
  console.log('-----------------------');
  console.log(`Title: ${task.title}\nDescription: ${task.body}`);
};

module.exports = {
  addTask,
  getAll,
  removeTask,
  getTask,
  updateTask,
  logTasks
};

// helper functions
function filterTasks(tasks, title) {
  return tasks.filter(task => task.title === title);
}

// Replace
function updateFunc(tasks, title, body, newTitle) {
  return fs.appendFileSync(tasks, newTitle, (task, err) => {
    if (err) throw err;
    console.log(task);
    return task;
  });
}
