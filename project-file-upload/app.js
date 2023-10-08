require('dotenv').config();
require('express-async-errors');


const getProducts = require("./routes/productRoutes");
const createProducts = require("./routes/productRoutes");
const uploadProductImage = require("./routes/productRoutes");

const express = require('express');
const app = express();
const fileUpload =require("express-fileupload");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOAUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
// database
const connectDB = require('./db/connect');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.static("./public"))
app.use(express.json())
//app.use(fileUpload())
app.use(fileUpload({useTempFiles:true})) // useTempFiles:true allows us to work with cloudinary

app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});

app.use("/api/v1/products",getProducts);

app.use("/api/v1/products",createProducts);

app.use("/api/v1/products/",uploadProductImage)


// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();