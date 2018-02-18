// todo.js

const mongoCollections = require("./mongoCollections");
const todos = mongoCollections.todoItems;
const uuidv4 = require('uuid/v4');

module.exports={
async getTask(id){
  if (!id) throw "You must provide an id to search for";
  const taskCollection = await todos();
  const result = await taskCollection.findOne({ _id: id });
  if (result === null) throw "No task with that id";
  return result;
},

async createTask(title, description){
    if (!title) throw "You must provide a title";
    if (!description) throw "You must provide a description";
    const taskCollection = await todos();

    let newTask = {
      _id: uuidv4(),
      title: title,
      description: description,
      completed: false,
      completedAt: null
    };

    const insertInfo = await taskCollection.insertOne(newTask);
    if (insertInfo.insertedCount === 0) throw "Could not create task";
    const task = await this.getTask(newTask._id);
    return task;
  },

async getAllTasks(){
    const taskCollection = await todos();
    const results = await taskCollection.find({}).toArray();
    return results;
  },

async completeTask(id){
  if (!id) throw "You must provide an id to search for";
  const taskCollection = await todos();
  //const oldTask = await this.getTask(id);
  const date = Date();

    const updatedInfo = await taskCollection.updateOne(
        { _id : id },
        { $set: {completed : true, completedAt : date} },
        { upsert: true }
    );
      //const updateInfo = await taskCollection.updateOne({ _id: id }, updatedTask);
      if (updatedInfo.modifiedCount === 0) {
        throw "could not complete task successfully";
      }

      return await this.getTask(id);
},
async removeTask(id){
  if (!id) throw "You must provide an id to search for";

  const taskCollection = await todos();
  const deletionInfo = await taskCollection.removeOne({ _id: id });

  if (deletionInfo.deletedCount === 0) {
      throw `Could not delete task with id of ${id}`;
    }}
};
