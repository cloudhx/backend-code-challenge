const helper = require("../utils/helper.util");
const Task = require("../models/task.model");

const taskMap = new Map();

function createTask(fn, ...parameters) {
  const taskGuid = helper.generateGuid();
  const task = new Task(taskGuid);

  new Promise((resolve) => {
    const result = fn(...parameters);
    task.result = result;
    task.completed = true;
    resolve();
  });

  taskMap.set(taskGuid, task);
  return task;
}

function getTask(taskGuid) {
  return taskMap.get(taskGuid);
}

module.exports = { createTask, getTask };
