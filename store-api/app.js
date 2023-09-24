const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");//this eliminates the use of try catch blocks

const getAllProducts =require("./routes/products");
// const getAllProductsTesting = require("./routes/products");No need for this, it would still work if i type: http://localhost:3000/api/v1/products/static in the url

const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");




//middleware to allow us have access to the req.body:
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>Products</a>");
});

app.use("/api/v1/products",getAllProducts);

// app.use("/api/v1/products",getAllProductsTesting);


app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, "localhost", () => {
      console.log("its on");
      console.log("Server listening on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
