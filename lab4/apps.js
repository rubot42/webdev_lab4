// apps.js
const td = require("./todo.js")
const connection = require("./mongoConnection");
/*
create task 1
{
    title: "Ponder Dinosaurs",
    description: "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?"
}
log task 1

create task 2
{
    title: "Play Pokemon with Twitch TV",
    description: "Should we revive Helix?"
}

query and log all tasks

remove the first task

query and log remaining tasks

complete task 2

log task 2 with the new value
*/

async function main(){
  let title1 = "Ponder Dinosaurs";
  let desc1  = "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?";
  let title2 = "Play Pokemon with Twitch TV"
  let desc2  = "Should we revive Helix?"

  console.log("Create task 1");
  const a = await td.createTask(title1, desc1);
  console.log(a); // log task 1
  console.log("Create task 2");
  const b = await td.createTask(title2, desc2);
  console.log("Query all tasks");
  const c = await td.getAllTasks();
  console.log(c) // log all tasks
  // remove task 1
  const d = await td.removeTask(a._id);
  //query all/remaining tasks
  console.log("Query after first deletion");
  const e = await td.getAllTasks();
  console.log(e); // log all/remaining tasks
  //complete task 2
  const f = await td.completeTask(b._id);
  console.log("Log after completion");
  //log task 2
  console.log(f);
  // remove task 2 to to keep the db empty
  const x = await td.removeTask(b._id);
  const db = await connection();
  await db.serverConfig.close();
}
main();
