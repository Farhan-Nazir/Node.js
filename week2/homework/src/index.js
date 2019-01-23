// Author: Farhan Nazir
'use strict';
// TODO: Write the homework code in this file
const yargs = require('yargs');

// Import my Model
const Tasks = require('./model/tasks');

var titleOptions = {
  describe: 'Title of the Task',
  required: true, //
  alias: 't'
};

var bodyOptions = {
  describe: 'Body of the Task',
  required: false, //
  alias: 'b'
};

var argv = yargs
  .command(
    'add',
    'Add a new task\nexample: yarn new -t "Title" -b "Description"',
    {
      title: titleOptions,
      body: bodyOptions
    }
  )
  .command('list', 'List all tasks\nexample: yarn start')
  .command('read', 'Read a task\nexample: yarn read -t "Title"', {
    title: titleOptions
  })
  .command('remove', 'Remove a task\nexample: yarn remove -t "Title" ', {
    title: titleOptions
  })
  .command(
    'update',
    'Update the existing task\nexample: yarn new -t "Title" -t "New title"',
    {
      title: titleOptions,
      body: bodyOptions
    }
  )
  .help().argv;

// var command = process.argv[2];
var command = argv._[0];

if (command === 'add') {
  var task = Tasks.addTask(argv.title, argv.body);
  if (task) {
    console.log('Task saved successfully.');
    Tasks.logTasks(task);
  }
 else {
    console.log(
      'A task with the same title already exists. Please change the title.'
    );
  }
}
 else if (command === 'list') {
  var allTasks = Tasks.getAll();
  console.log(`Printing ${allTasks.length} task(s).`);
  allTasks.forEach(task => {
    Tasks.logTasks(task);
  });
}
 else if (command === 'remove') {
  var taskRemoved = Tasks.removeTask(argv.title);
  var message = taskRemoved ? 'Task was removed' : 'Task not found';
  console.log(message);
}
 else if (command === 'read') {
  var task = Tasks.getTask(argv.title);
  if (task) {
    console.log('Task Found');
    Tasks.logTasks(task);
  }
 else {
    console.log('Task not found.');
  }
}
 else if (command === 'update') {
  var task = Tasks.updateTask(argv.title, argv.body);
  if (task) {
    console.log('Task Found');
    Tasks.logTasks(task);
  }
 else {
    console.log('Task not found.');
  }
}
 else {
  console.log('Command not recognized');
}
