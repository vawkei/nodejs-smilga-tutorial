const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  //initially:
  //res.send("<h1>All items </h1>");
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks }); // this gets all our tasks from mongodb atlas
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  //initially:
  //res.send("<h1>Create Task</h1>")
  // res.json(req.body)
  // console.log(req.body)
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
  // this spits out this:{
  //     "task": {
  //         "_id": "6505110420f6844a2c91efd6",
  //         "name": "shakeandbake",
  //         "completed": true,
  //         "__v": 0
  //     }
  // } in post man when i type :{"name":"shakeandbake","completed":true}. that means we have created a new document with an id,name,completed,__v property in our mongo atlas.
};

const getSingleTask = async (req, res) => {
  //initial:
  //res.send("<h1>Get Single Task</h1>");
  try{
    const {id:taskID} = req.params
    const task = await Task.findOne({_id:taskID});
    if(!task){
      return res.status(404).json({msg:`No task with id:${taskID}`})
    }
    res.status(200).json({task})
  }catch(error){
    res.status(500).json({msg: error})
  }
};
//so if i type this:localhost:3000/api/v1/tasks/6505224cf7a2140504ada39c in the url or postman, it retrieves the document with the id 6505224cf7a2140504ada39c.

const updateTask = async (req, res) => {
  //initially:
  //res.send("<h1>Update Task</h1>");

  try {
    const taskId = req.params.id;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
      //the third parameter is the options object: it helps us get the new task we updated to,because by default we get back the former one
    });

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${task}` });
    }

    res.status(200).json({ id: taskId, task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  //initially:
  //res.send("<h1>Delete Task </h1>");

  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      res.status(404).json(`No task with id: ${task}`);
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
