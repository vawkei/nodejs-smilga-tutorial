const express = require("express");
const app = express();
const path = require("path");
const getAllTasks = require("./routes/tasks");
const createTask = require("./routes/tasks");
const getSingleTask = require("./routes/tasks");
const updateTask = require("./routes/tasks");
const deleteTask = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config()
const notFound = require("./middlewares/not-found");


//middleware to load the web app's homepage:
app.use(express.static("../public-task-manager-project"))

//middleware;so we can have access to the req.body:
app.use(express.json());

//Route:
app.use("/api/v1/tasks", getAllTasks);
app.use("/api/v1/tasks", createTask);
app.use("/api/v1/tasks/:id", getSingleTask);
app.use("/api/v1/tasks/:id", updateTask);
app.use("/api/v1/tasks/:id", deleteTask);

//==========================SHIT STARTS HERE==========================
// app.get("/",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,"./index.html"))
// });

//app.use(express.static("../public-task-manager-project"))
// app.get("/",(req,res)=>{
//     res.send("<h1>We Live </h1>")
//     console.log("it's on")
// });
//====================ENDS UP=================================================

app.use(notFound);

//const port = 3000
// const port = process.env.PORT || 3000 this is how is it set when deploying it
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(5000, "localhost", () => {
      console.log("server listening on port 5000");
    });
  } catch (error) {
    console.log(error)
  };
};

start()
