require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const getAllJobs = require("./routes/jobs");
const getJob = require("./routes/jobs");
const createJob = require("./routes/jobs");
const updateJob = require("./routes/jobs");
const deleteJob = require("./routes/jobs");

const register = require("./routes/auth");
const login = require("./routes/auth");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
// extra packages
const helmet = require("helmet");
const cors = require("cors");
const xssClean = require("xss-clean");
const rateLimiter  = require("express-rate-limit")

app.set("trust proxy",1)

app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, //15 minutes;
  max:100 //limit each IP to 100 requests per windowMs
}));

app.use(helmet());
app.use(cors());
app.use(xssClean());

  

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use("/api/v1/jobs", getAllJobs);
app.use("/api/v1/jobs/:id", getJob);
app.use("/api/v1/jobs", createJob);
app.use("/api/v1/jobs/:id", updateJob);
app.use("/api/v1/jobs/:id", deleteJob);

app.use("/api/v1/auth/", register);
app.use("/api/v1/auth/", login);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;


const start =async ()=>{
  try{
    await connectDB(process.env.MONGO_URI);
    app.listen(port,"localhost",()=>{
      console.log("Connected to DB")
      console.log(`Server is listening on port ${port}`)
    })
  }catch(error){
    console.log(error)
  }
}

start();
