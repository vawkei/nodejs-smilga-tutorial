
const getAllTasks =  (req,res)=>{
    res.send("<h1>All items </h1>")
};

const createTask = (req,res)=>{
    //res.send("<h1>Create Task</h1>")
    res.json(req.body)
    console.log(req.body)
};

const getSingleTask = (req,res)=>{
    res.send("<h1>Get Single Task</h1>")
};

const updateTask =  (req,res)=>{
    res.send("<h1>Update Task</h1>")
};

const deleteTask =  (req,res)=>{
    res.send("<h1>Delete Task </h1>")
}

module.exports = {getAllTasks,createTask,getSingleTask,updateTask,deleteTask}