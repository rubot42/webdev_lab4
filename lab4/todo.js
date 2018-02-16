// todo.js

const mongoCollections = require("./mongoCollections");
const todos = mongoCollections.todoItems;
const uuidv4 = require('uuid/v4');
/*
  format
{
    _id: "a unique identifier for the task; you will generate these using uuid package",
    title: "the title of the task",
    description: "a descriptive bio of the task",
    completed: false,
    completedAt: null
}
*/

async function createTask(){
    const taskCollection = await todos();

    let newTask = {id: uuidv4()};

    const insertInfo = await taskCollection.insertOne(newTask);
    if (insertInfo.insertedCount === 0) throw "Could not add task";

    const newId = insertInfo.insertedId;

   // const dog = await this.getDogById(newId);
   //return dog;
    }
//async function getAllTasks(){}
//async function getTask(id){}
//async function completeTask(taskId){}
//async function removeTask(id){}
